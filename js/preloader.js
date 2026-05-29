/* ============================================
   CAR DASHBOARD SPEEDOMETER PRELOADER SCRIPT
   ============================================ */

(function() {
  document.body.classList.add('preloader-active');

  const preloader = document.getElementById('preloader');
  const gearEl = document.getElementById('preloader-gear');
  const speedEl = document.getElementById('preloader-speed');
  const revBar = document.getElementById('preloader-rev-bar');
  const statusEl = document.getElementById('preloader-status');
  const leds = document.querySelectorAll('.preloader__led');

  // Assign color classes to the LEDs programmatically
  leds.forEach((led, idx) => {
    if (idx < 5) {
      led.classList.add('preloader__led--cyan');
    } else if (idx < 8) {
      led.classList.add('preloader__led--blue');
    } else {
      led.classList.add('preloader__led--red');
    }
  });

  let speed = 0;
  const targetSpeed = 340;
  const duration = 1600; // 1.6 seconds total
  let startTime = null;

  function updateDashboard(currentSpeed) {
    // Round speed to display
    const speedInt = Math.floor(currentSpeed);
    speedEl.textContent = String(speedInt).padStart(3, '0');

    // Gear shifting thresholds
    let gear = 1;
    let statusText = "ENGAGING ENGINE...";

    if (speedInt <= 55) {
      gear = 1;
      statusText = "ENGAGING 1ST GEAR...";
    } else if (speedInt <= 110) {
      gear = 2;
      statusText = "REVVING... SHIFTING 2ND GEAR...";
    } else if (speedInt <= 170) {
      gear = 3;
      statusText = "TURBO CHARGER ACTIVE...";
    } else if (speedInt <= 230) {
      gear = 4;
      statusText = "SHIFING 4TH... INTAKE STAGE 2...";
    } else if (speedInt <= 290) {
      gear = 5;
      statusText = "NITROUS OXIDE INJECTED...";
    } else {
      gear = 6;
      statusText = "REDLINE RPM ATTAINED...";
    }

    gearEl.textContent = gear;
    statusEl.textContent = statusText;

    // Light up LEDs based on current RPM (speed ratio)
    const ledThreshold = (currentSpeed / targetSpeed) * leds.length;
    leds.forEach((led, idx) => {
      if (idx < ledThreshold) {
        led.classList.add('active');
      } else {
        led.classList.remove('active');
      }
    });

    // Check if we hit redline (near top speed)
    if (speedInt >= 320) {
      revBar.classList.add('redline-blink');
    } else {
      revBar.classList.remove('redline-blink');
    }
  }

  function animateSpeedometer(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    const timeRatio = Math.min(progress / duration, 1);

    // Exponential ease-in-out curve for car acceleration feel
    // (starts slow, climbs fast in the middle, tapers off slightly at the limit)
    const speedRatio = timeRatio < 0.5
      ? 4 * timeRatio * timeRatio * timeRatio
      : 1 - Math.pow(-2 * timeRatio + 2, 3) / 2;

    speed = speedRatio * targetSpeed;
    updateDashboard(speed);

    if (progress < duration) {
      requestAnimationFrame(animateSpeedometer);
    } else {
      // Top speed achieved! Trigger Launch Sequence
      speed = targetSpeed;
      updateDashboard(speed);
      statusEl.textContent = "LAUNCH COMPLETED!";
      
      setTimeout(() => {
        // Fade out preloader screen
        preloader.classList.add('preloader--fade-out');
        document.body.classList.remove('preloader-active');

        // Trigger accelerating entry animations for Vikram Madhad names
        const names = document.querySelectorAll('.preloader-hidden');
        names.forEach(el => {
          el.classList.add('revving');
        });

        // Fully remove preloader element from DOM after transition finishes
        setTimeout(() => {
          preloader.remove();
        }, 800);
      }, 300);
    }
  }

  // Kick off speedometer ignition revs
  requestAnimationFrame(animateSpeedometer);
})();
