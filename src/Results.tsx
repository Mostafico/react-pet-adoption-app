import { FunctionComponent } from "react";
import Pet from "./Pet";
import { Pet as PetType} from "./APIResponseTypes"

const results: FunctionComponent<{pets: PetType[]}> = ({ pets }) => {
  return (
    <div className="search">
      {!pets.length ? (
        <h2>No pets Found</h2>
      ) : (
        pets.map((pet) => (
          <Pet
            animal={pet.animal}
            key={pet.id}
            name={pet.name}
            breed={pet.breed}
            images={pet.images}
            location={`${pet.city}, ${pet.state}`}
            id={pet.id}
          />
        ))
      )}
    </div>
  );
};

export default results;
