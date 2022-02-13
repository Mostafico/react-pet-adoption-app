import { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(error);
    setTimeout(() => this.setState({ redirect: true }), 5000);
  }

  render() {
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
