import React, { useEffect, useRef, useState } from "react";
import Modal from "../common/Modal";
import GifSlideshow from "../common/GifSlideshow";
import { inertialFrame, requestPermission } from "../util";
import { requestPermission as requestPermissionAction } from "../store/actions/appMetaInfo";
import { useDispatch, useSelector } from "react-redux";
import { updateUserMoment } from "../store/actions/userMoment";

export const UserMoment = () => {
  // handlemotionvariables
  const final_s = useRef(0);
  const prev_force = useRef(0);
  const final_force = useRef(0);
  const prev_time = useRef(Date.now());
  const sp_x = useRef(0);
  const final = useRef(0);
  const push = useRef(0);
  const steps = useRef(0);
  const push_y = useRef(0);
  const travel = useRef(0);
  const travel_state = useRef(0);
  const omega_a = useRef(0);
  const omega_a_p = useRef(0);
  const omega_max_p = useRef(0);
  const omega_max = useRef(0);
  const lrav_prev = useRef(-1);
  const lrav_now = useRef(0);
  const lrav_push = useRef(0);
  const lrav_final = useRef(0);
  const lrah_final = useRef(0);
  const lrov_final = useRef(0);
  const lroh_prev = useRef(-1);
  const lroh_now = useRef(0);
  const lroh_push = useRef(0);
  const lroh_final = useRef(0);

  const [final_speed, setFinalSpeed] = useState(0);

  //handlemotionvariables
  const { permissionGranted, userSteps } = useSelector((state) => ({
    permissionGranted: state.appMetaInfoReducer.permissionGranted,
    userSteps: state.userMomentReducer.steps,
  }));

  const permissionGrantedRef = useRef(permissionGranted);
  const dirRef = useRef();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(!permissionGranted);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOrientation = (event) => {
    dispatch(requestPermissionAction());
    dirRef.current = {
      alpha: parseInt(event.alpha),
      beta: parseInt(event.beta),
      gamma: parseInt(event.gamma),
    };

    if (!window.calibrateOffset) {
      window.calibrateOffset = -1 * dirRef.current.alpha;
    }
    window.calibrateAlpha =
      (360 + dirRef.current.alpha + window.calibrateOffset) % 360;

    dispatch(
      updateUserMoment({
        steps: 100,
        angle: 100,
      })
    );
  };

  const handleMotion = (event) => {
    dispatch(requestPermissionAction());

    // main logic starts here  STEPS ALGO

    const acc_th = 0.1;
    const time_th = 0.4;
    const travel_th = 4;

    let accn_x = parseInt(event.acceleration.x);
    if (Math.abs(accn_x) < acc_th) {
      accn_x = 0;
    }
    let accn_y = parseInt(event.acceleration.y);
    if (Math.abs(accn_y) < acc_th) {
      accn_y = 0;
    }
    let accn_z = parseInt(event.acceleration.z);
    if (Math.abs(accn_z) < acc_th) {
      accn_z = 0;
    }
    const sin_a = parseInt(dirRef.current.alpha); // * (Math.PI / 180))
    const sin_b = parseInt(dirRef.current.beta); // * (Math.PI / 180))
    const sin_g = parseInt(dirRef.current.gamma); // * (Math.PI / 180))
    const rate_a = parseInt(event.rotationRate.alpha);
    const rate_b = parseInt(event.rotationRate.beta);
    let rate_c = parseInt(event.rotationRate.gamma);
    const final_omega = inertialFrame(
      sin_a * (Math.PI / 180),
      sin_b * (Math.PI / 180),
      sin_g * (Math.PI / 180),
      rate_a,
      rate_b,
      rate_c
    );
    rate_c = final_omega[2];

    final.current = inertialFrame(
      sin_a * (Math.PI / 180),
      sin_b * (Math.PI / 180),
      sin_g * (Math.PI / 180),
      accn_x,
      accn_y,
      accn_z
    );
    // accn vertical
    if (lrav_prev.current == -1) {
      if (final.current[2] < 0) {
        lrav_push.current -= 1;
      }
      if (lrav_push.current < -10) {
        lrav_now.current = 1;
      }
    } else {
      if (final.current[2] > 0) {
        lrav_push.current += 1;
      }
      if (lrav_push.current > 3) {
        lrav_now.current = -1;
      }
    }
    lrav_final.current = lrav_prev.current * lrav_now.current;

    // omega horizontal
    if (lroh_prev.current == -1) {
      if (rate_c < 0) {
        lroh_push.current -= 1;
      }
      if (lroh_push.current < -10) {
        lroh_now.current = 1;
      }
    } else {
      if (rate_c > 0) {
        lroh_push.current += 1;
      }
      if (lroh_push.current > 10) {
        lroh_now.current = -1;
      }
    }
    lroh_final.current = lroh_prev.current * lroh_now.current;

    //push implementation
    const timeDiff = (Date.now() - prev_time.current) / 1000;
    if (final.current[2] > 0) {
      if (push.current < 1) {
        push.current += 0.334;
      }
      if (accn_y < 0 && push_y.current < 1) {
        push_y.current += 0.334;
      }
      if (push_y.current >= 1 && timeDiff > time_th) {
        push_y.current = 1;
        travel.current += 1;
      }
      if (travel.current >= travel_th) {
        travel_state.current = 1;
      }

      final_force.current = Math.max(final.current[2], final_force.current);
      omega_max.current = Math.max(Math.abs(rate_c), omega_max.current);
      omega_a.current = Math.max(Math.abs(rate_a), omega_a.current);

      if (
        push.current >= 1 &&
        timeDiff > time_th &&
        (push_y.current >= 1 || travel_state.current == 1)
      ) {
        if (
          omega_max.current < 50 &&
          omega_max.current > 5 &&
          (lroh_final.current == -1 || lrav_final.current == -1)
          //||travel_state.current == 0
        ) {
          steps.current += 1;
          push.current = 1;
          prev_time.current = Date.now();
          lroh_prev.current = lroh_now.current;
          lroh_push.current = 0;
          lrav_prev.current = lrav_now.current;
          lrav_push.current = 0;

          if (omega_a.current > 0) {
            omega_a_p.current = omega_a.current;
          }
          omega_a.current = 0;

          if (omega_max.current > 0) {
            omega_max_p.current = omega_max.current;
          }
          omega_max.current = 0;

          if (final_force.current > 0) {
            prev_force.current = final_force.current;
          }
          final_force.current = 0;
          //   window.angleError = Math.atan(Math.sin(sin_a* (Math.PI / 180))/(window.currentStep-Math.cos(sin_a* (Math.PI / 180))));
          //   window.stepError = Math.sqrt((window.currentStep - Math.cos(sin_a* (Math.PI / 180))) + Math.sin(sin_a* (Math.PI / 180)));
          //   window.stepError = window.currentStep - window.stepError-1;
        }

        if (omega_max.current > 0) {
          omega_max_p.current = omega_max.current;
        }
        omega_max.current = 0;
      }
    }

    if (final.current[2] <= 0) {
      push.current -= 0.51;
      if (push.current < 0) {
        push.current = 0;
        push_y.current = 0;
      }
    }

    sp_x.current = Math.sqrt(
      prev_force.current * omega_a_p.current * omega_max_p.current
    );

    setFinalSpeed(final_s.current.toFixed(3));
    dispatch(updateUserMoment({ steps: parseFloat(steps.current) }));

    // main logic ends here  STEPS ALGO
  };

  useEffect(() => {
    permissionGrantedRef.current = permissionGranted;
    if (permissionGranted) setOpen(false);
  }, [permissionGranted]);
  return (
    <>
      <Modal isOpen={open} onClose={handleClose}>
        <GifSlideshow
          requestPermission={() => {
            requestPermission({ handleOrientation, handleMotion });
          }}
        />
      </Modal>
      <div>{userSteps}</div>
    </>
  );
};
