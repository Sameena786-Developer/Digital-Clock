function updateClock() {
      // Get current UTC time
      let now = new Date();
      let utcHours = now.getUTCHours();
      let utcMinutes = now.getUTCMinutes();
      let utcSeconds = now.getUTCSeconds();

      // Convert UTC → IST (+5:30)
      let totalMinutes = utcMinutes + 30;
      let minutes = totalMinutes % 60;
      let extraHour = Math.floor(totalMinutes / 60);
      let hours24 = (utcHours + 5 + extraHour) % 24;
      let seconds = utcSeconds;

      // 12-hour format
      let ampm = hours24 >= 12 ? "PM" : "AM";
      let hours12 = hours24 % 12;
      hours12 = hours12 ? hours12 : 12;

      // Add leading zeros
      let hoursStr = String(hours12).padStart(2, "0");
      let minutesStr = String(minutes).padStart(2, "0");
      let secondsStr = String(seconds).padStart(2, "0");

      // Update clock
      document.getElementById("clock").textContent =
        hoursStr + ":" + minutesStr + ":" + secondsStr + " " + ampm;

      // Date in IST
      let istDate = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
      let options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
      let today = istDate.toLocaleDateString(undefined, options);
      document.getElementById("date").textContent = today;

      // Greeting
      let greetingText;
      if (hours24 < 12) {
        greetingText = "🌞 Good Morning!";
      } else if (hours24 < 18) {
        greetingText = "🌤️ Good Afternoon!";
      } else {
        greetingText = "🌙 Good Evening!";
      }
      document.getElementById("greeting").textContent = greetingText;
    }

    updateClock(); // run once immediately
    setInterval(updateClock, 1000); // update every second