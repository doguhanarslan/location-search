import type { Place } from "../api/Place";
import { Fragment, useState } from "react";
import { search } from "../api/search";

interface LocationSearchProps {
  onPlaceClick: (place: Place) => void;
}

export default function LocationSearch({ onPlaceClick }: LocationSearchProps) {
  const [places, setPlaces] = useState<Place[]>([]);
  const [term, setTerm] = useState("");

  // event'in türü her zaman aynı. ezberle

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const results = await search(term);

    setPlaces(results);
  };

  return (
    <div className="p-2">
      <form onSubmit={handleSubmit}>
        <div className="items-center justify-center flex border p-2 rounded-tl-lg rounded-tr-lg ">
          <label className="font-bold text-center" htmlFor="term">
            Search Location
          </label>
        </div>
        <div>
          <input
            className="border border-gray-300 rounded-br-lg rounded-bl-lg shadow-sm focus:border-indigo-500 px-3 py-2 w-full"
            id="term"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
      </form>
      <div className="mb-4 items-center justify-center flex border rounded-2xl mt-6 p-2">
        <h1 className="font-bold">Found Locations</h1>
      </div>
      <div className="grid grid-cols-[1fr_30px] gap-2 mt-2 items-center">
        {places.map((place) => {
          return (
            <Fragment key={place.id}>
              <div className="flex flex-row py-1 items-center gap-2 w-full">
                <div>
                  <p className="text-sm">{place.name}</p>
                </div>
                <div className="flex flex-row items-center">
                  <button
                    onClick={() => onPlaceClick(place)}
                    className="bg-slate-200 text-xs text-white font-bold p-2 px-5 rounded"
                  >
                    Go
                  </button>
                </div>
              </div>
              <div className="border-b w-full col-span-2" />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
