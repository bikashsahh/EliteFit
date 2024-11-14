1. How long did you spend on the coding test?
Answer: 
    I spent around 7 to 8 hours on the coding test. I dedicated time to thoroughly planning the project structure, ensuring efficient state management, and implementing responsive design. Balancing functionality and code clarity was my priority to create a maintainable solution.


2. What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.
Answer: 
    One of the most useful features recently introduced in JavaScript is the optional chaining operator (?.). It allows me to access deeply nested properties without having to write extensive checks for null or undefined values, which is particularly useful in complex applications with many layers of nested data.

    Code snippet:
    javascript

    const user = {
    profile: {
        address: { city: "New York" }
    }
    };

    // Using optional chaining to safely access city
    const userCity = user.profile?.address?.city || "City not available";
    console.log(userCity); // Output: "New York"

    This feature has streamlined my code, reduced verbosity, and improved readability. I used it extensively in the task manager to safely retrieve properties of tasks without unnecessary error-checking.


3. How would you track down a performance issue in production? Have you ever had to do this?
Answer: 
    To track down performance issues in a React application, I’d focus on using React-specific tools, primarily React DevTools and React Profiler.

    With React DevTools, I can inspect component trees, see props and state, and monitor how components interact. For deeper analysis, React Profiler allows me to measure component rendering times and track down any unnecessary renders. For instance, I once used React Profiler to identify a component that was rerendering too often due to inefficient state updates. By optimizing this component’s render logic, I was able to significantly improve the app’s responsiveness.

    These tools are essential for quickly finding and fixing React-specific performance bottlenecks.


4. If you had more time, what additional features or improvements would you consider adding to the task management application?
Answer: 
    With more time, I would enhance the task manager with these additional features:
    Collaboration: Adding shared task lists or assigning tasks to multiple users for better team productivity.

    Real-time Updates: Using WebSocket or Firebase to sync tasks across multiple devices or users in real-time.


    Due Date Notifications: Implementing reminders or push notifications to alert users of upcoming or overdue tasks.

    Customizable Task Views: Allowing users to personalize their task list by filtering, sorting, or grouping.

    Improved Filtering: Adding advanced filter options like tags or task labels, enabling users to organize tasks by custom criteria.

    These features would enrich the user experience and make the application a more robust solution for managing tasks in personal or team-based workflows.
