import { Component, FunctionComponent } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";
import { PetAPIResponse, Animal } from "./APIResponseTypes";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundry";

class Details extends Component<RouteComponentProps<{ id: string }>> {
  state = {
    loading: true,
    showModal: false,
    animal: "" as Animal,
    breed: "",
    city: "",
    state: "",
    description: "",
    name: "",
    images: [] as string[],
  };

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );

    const json = (await res.json()) as PetAPIResponse;
    this.setState(
      Object.assign(
        {
          loading: false,
        },
        json.pets[0]
      )
    );
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => (window.location.href = "http://bit.ly/pet-adopt");

  render() {
    if (this.state.loading) {
      return <h2>Loading...</h2>;
    }

    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;

    if (!animal) {
      throw new Error("No animal found");
    }

    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${city}, ${state}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h2>Would you like to adopt {name}</h2>
                <div className="buttons">
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const DefaultWithRouter = withRouter(Details);

const DetailsErrorBoundary: FunctionComponent =
  function DetailsErrorBoundary() {
    return (
      <ErrorBoundary>
        <DefaultWithRouter />
      </ErrorBoundary>
    );
  };

export default DetailsErrorBoundary;