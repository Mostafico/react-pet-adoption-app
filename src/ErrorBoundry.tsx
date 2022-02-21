import { Component, ErrorInfo, ReactNode } from "react";
import { Link, Redirect } from "react-router-dom";

interface StateType{
  hasError : boolean;
  redirect : boolean;
}

class ErrorBoundary extends Component {
  state = { hasError: false, redirect: false };

  static getDerivedStateFromError() : StateType {
    return { hasError: true, redirect: false };
  }

  componentDidCatch(error: Error, info: ErrorInfo) : void{
    console.error(error, info);
    setTimeout(() => this.setState({ redirect: true }), 5000);
  }

  render() : ReactNode {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.hasError) {
      return (
        <h2>
          Something went wrong ..
          <Link to="/"> Go Home </Link>
          or wait 5 seconds to be redirected
        </h2>
      );
    }
    return this.props.children; //be invisible if no error
  }
}

export default ErrorBoundary;
