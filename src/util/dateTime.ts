export function getDateRange(days: number) {
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(today.getDate() - days);
  
    const formatDate = (date: Date) => {
        const options: any = { month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };
  
    const todayDateStr = formatDate(today);
    const startDateStr = formatDate(endDate);
  
    return `${startDateStr} - ${todayDateStr}`;
}


export function getShortDateFormate(dateString: string) {
    // Create a Date object from the input string
    const date = new Date(dateString);

    // Get the month and day from the Date object
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate().toString().padStart(2, '0');

    // Combine the month and day into the desired format
    return `${month} ${day}`;
}

export function displayCreatedAtDate(dateString: string) {
    // Create a Date object from the input string
    const date = new Date(dateString);

    // Get the date components
    const year = date.getFullYear();
    // const month = String(date.getMonth() + 1).padStart(2, "0");
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = String(date.getDate()).padStart(2, "0");

    // Get the time components
    // const hours = String(date.getHours()).padStart(2, "0");
    const hourz = date.getHours();

    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const meridian = hourz >= 12 ? "PM" : "AM";
    // Adjust hours for 12-hour format and handle special cases
    const adjustedHours = hourz % 12 || 12; // 0 becomes 12 for consistency


    // Combine the month and day into the desired format
    // return `${day} ${month} ${year} ${hours}:${minutes}${seconds}`;
    return `${day} ${month} ${year} ${adjustedHours}:${minutes}:${seconds} ${meridian}`;
}

export function getFormattedDateRange(days: number) {
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(today.getDate() - days);
  
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
  
    const startDateStr = formatDate(endDate);
    const todayDateStr = formatDate(today); 
  
    return { startDate: startDateStr, todayDate: todayDateStr };
} 


export function getCurrentDateTime() {
    const now = new Date();
  
    // Get the date components
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
  
    // Get the time components
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
  
    // Assemble the date-time string
    const dateTimeString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  
    return dateTimeString;
}
  
export function formatTransactionDate(dateString: string) {
    // Create a Date object from the string
    const date = new Date(dateString);
  
    // Extract day, month, and year components
    const day = date.getDate().toString().padStart(2, "0");
    // const month = date.toLocaleDateString("en-US", { month: "short" });
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
  
    // Format the date in the desired format
    return `${day}/${month}/${year}`;
}

export function chatTimeFormat(dateString: string) {
    // Create a Date object from the string
    const date = new Date(dateString);
  
    // Extract hours, minutes, and meridian indicator
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const meridian = hours >= 12 ? "PM" : "AM";
  
    // Adjust hours for 12-hour format and handle special cases
    const adjustedHours = hours % 12 || 12; // 0 becomes 12 for consistency
  
    // Format the time in the desired format
    return `${adjustedHours}:${minutes} ${meridian}`;
}
  

export function displayTime(time: number) {
    let seconds: number | string = Math.floor(time % 60);
    let foo = time - seconds;
    let min = foo / 60;
    let minutes: number | string = Math.floor(min % 60);
    let hours = Math.floor(min / 60);
  
    if (seconds < 10) {
        seconds = "0" + seconds.toString();
    }
  
    if (minutes < 10) {
        minutes = "0" + minutes.toString();
    }
  
    if (hours > 0) {
        return hours + ":" + minutes + ":" + seconds;
    } else {
        return minutes + ":" + seconds;
    }
}
  
export function getTime(inputDate: any = "") {
    const now = inputDate ? new Date(inputDate) : new Date();
    const hours = now.getHours() % 12 || 12; // Convert to 12-hour format and handle leading zero
    const minutes = now.getMinutes().toString().padStart(2, "0"); // Add leading zero for minutes if needed
    const period = now.getHours() >= 12 ? "PM" : "AM";
  
    return `${hours}:${minutes} ${period}`;
}

export function getDate(inputDate: any = "") {
    const now = inputDate ? new Date(inputDate) : new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1; // Months are zero-indexed, so add 1
    const year = now.getFullYear();
  
    // Add ordinal suffix to the day (e.g., "st", "nd", "rd", "th")
    const daySuffix =
      day < 10 || day > 20 ? ["th", "st", "nd", "rd", "th"][day % 10] : "th";
  
    // Format the month name
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
  
    return `${day}${daySuffix} ${monthNames[month - 1]}. ${year}`;
}


export function timeCounter(targetDate: any) {
    const givenDate: any = new Date(targetDate);
    const now: any = new Date();
  
    const differenceInMilliseconds = now - givenDate;
  
    const seconds = Math.floor((differenceInMilliseconds / 1000) % 60);
    const minutes = Math.floor((differenceInMilliseconds / 1000 / 60) % 60);
    const hours = Math.floor(differenceInMilliseconds / 1000 / 60 / 60);
  
    if (hours > 0) {
        const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        return formattedTime;
    } else {
        const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
        return formattedTime;
    }
  
    // intervalId = setInterval(updateTimeDifference, 1000); // Update every second
  
    // // Ensure cleanup when the function isn't needed anymore
    // return () => clearInterval(intervalId);
}
  


export function getMonthDateRange(monthNumber: number, year = new Date().getFullYear()) {
    // Ensure the monthNumber is valid (between 0 and 11)
    if (monthNumber < 0 || monthNumber > 11) {
        // If invalid, use the current month
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth(); // Get current month (0-11)
        year = currentDate.getFullYear(); // Get current year
        monthNumber = currentMonth; // Set monthNumber to the current month
    }
  
    // Get the start date for the given month
    const startDate = new Date(year, monthNumber, 1); // monthNumber is 0-indexed
  
    // Get the end date by creating a new date for the start of the next month, then subtracting one day
    const endDate = new Date(year, monthNumber + 1, 1); // next month
    endDate.setDate(endDate.getDate() - 1); // subtract 1 day to get the last day of the current month
  
    // Format the dates as YYYY-MM-DD strings
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];
  
    return { startDate: formattedStartDate, endDate: formattedEndDate };
}

export const getCurrentMonthValue = () => {
    const today = new Date();
    const monthNumber = today.getMonth(); 
    return monthNumber;
}


export function getSalesPeriod(month = getCurrentMonthValue()) {
    // const month = getCurrentMonthValue();
    const dateRange = getMonthDateRange(month);

    return `${getShortDateFormate(dateRange.startDate)} - ${getShortDateFormate(dateRange.endDate)}`;
}