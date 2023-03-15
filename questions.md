Please answer the following questions to the best of your knowledge, in clear
English. Elaborate and try to demonstrate the React knowledge you have. Feel free
to give examples and use cases.
DO NOT USE ANY WEB OR OTHER RESOURCE.
1. What is the difference between Component and PureComponent? give an
example where it might break my app.
    * answer *
    The major difference between React.PureComponent and React.Component is PureComponent does a shallow comparison on state change.
    It means that when comparing scalar values it compares their values, but when comparing objects it compares only references.
    It helps to improve the performance of the app

    - You should go for React.PureComponent when you can satisfy any of the below conditions.
      1.  State/Props should be an immutable object.
      2.  State/Props should not have a hierarchy.
      3.  You should call forceUpdate when data changes.
    - Shallow Comparison
      When comparing previous props and state to next, a shallow comparison will check that primitives have the same value (eg, 1 equals 1 or that true equals true) 
      and that the references are the same between more complex javascript values like objects and arrays.
2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?
    I am not sure.
    because I always use function component.
    Maybe ShouldComponentUpdate is probably used in Class Component.

Note:concept of component and pure component is not relevant anymore in the current React landscape.
3. Describe 3 ways to pass information from a component to its PARENT.
    * answer *
    1.To easily pass data from your child to the parent component in React, pass a callback function to your child as a prop, call the function inside your child with your data, 
    and access the data within your function from your parent component.
        Ex: const child = ({ callback }) => {
            const state = {
                example: 1
            };
            const handleCallback = () => callback(state)

            return (
                <button onClick = {handleCallback}>Pass data to parent</button>
            )
        }
        export default function parent() {
            const [state, setstate] = useState({});
            const callback = payload => {
                setState(payload);
            }
            return(
                <div>
                    <h1>Parent</h1>
                    <child callback={callback}/>
                </div>
            )
        }
    2.Using Redux
    3.Using React's Context API (don't use often)
4. Give 2 ways to prevent components from re-rendering.
    * answer *
    1.Replace useState() with useRef()

    2.API Call Optimization with React Query
        It’s common to use the useEffect() Hook for asynchronous data fetching operations in React applications. However, useEffect() runs and fetches data on each render, 
        and in most situations, it keeps loading the same data.
        As a solution, we can use the React Query library to cache the response data. When we make an API call, 
        React Query will first return the data from the cache before continuing with the request. 
        Then, it will retrieve the data from the server, and if there is no new data available, it will prevent the component from re-rendering.
        Ex:
        import {useQuery} from 'react-query'
        import axios from 'axios'
        async function fetchArticles(){
        const {data} = await axios.get(URL)    
        return data
        }
        function Articles(){
        const {data, error, isError, isLoading } = useQuery('articles', fetchArticles)
        
        if(isLoading){
            return <div>Loading...</div>
        }
        if(isError){
            return <div>Error! {error.message}</div>
        }
        return(
            <div>
            ...
            </div>
        )
        }
        export default Articles
5. What is a fragment and why do we need it? Give an example where it might
break my app.
    *answer*
    - If you have worked with React before, you will know that React requires wrapping the components with a single parent element. Though it’s not directly about re-rendering,
        have you known that it affects the overall component rendering time?
        As a solution, you can use React Fragments to wrap the components, and it will reduce the load on the DOM, resulting in faster rendering times and decreased memory usage.
    Ex:
    const App= () => {
    return (
        <React.Fragment><p>Hello<p/><p>World<p/></React.Fragment>
    );
    };
6. Give 3 examples of the HOC pattern.
    *answer*
    HOC is Higher-Order-Component
    This is an advanced technique in React for reusing component logic
    If you’ve been using React for some time, you might have felt the need to have copies of the same logic in multiple components.
    1.Infinite scroll in three different views, all having different data
    2.App components that need logged in user data
    3.Enhancing different card views with same border and shadow

7. what's the difference in handling exceptions in promises, callbacks and
async...await.
    *answer*
    A callback function is passed as an argument to another function whereas Promise is something that is achieved or completed in the future.
    In JavaScript, a promise is an object and we use the promise constructor to initialize a promise.
    With async/await, the code inside an async function is executed in a synchronous-like way, making it more readable and easier to understand. 
    It also helps to avoid the callback hell problem
8. How many arguments does setState take and why is it async.
    *answer*
    The setState method takes up to 2 arguments. We usually pass in only one. The first argument can be an object or a callback that's used to update the state.
    If you have a look at the code inside the setState() function in React's codebase, you will find that setState() is not at all an asynchronous function and it is always synchronous. It's just that it calls enqueueState or enqueueCallback when updated behind the scenes, and thus its execution feels like it is async.
9. List the steps needed to migrate a Class to Function Component.
    *answer*
    1.use function instead of class
    2.remove the constructor
    3.remove the render() method, keep the return
    4.add const before all methods
    5.remove this.state throughout the component
    6.remove all references to ‘this’ throughout the component
    7.Set initial state with useState()
    8.change this.setState() … instead, call the function that you named in the previous step to update the state…
    9.replace compentDidMount with useEffect
    10.replace componentDidUpdate with useEffect
10. List a few ways styles can be used with components.
    *answer*
    1.inline CSS
    2.normal CSS
    3.CSS in JS libraries
    4.CSS Modules
    5.Sass & SCSS
11. How to render an HTML string coming from the server.
    *answer*
    dangerouslySetInnerHTML attributes to render your html strings