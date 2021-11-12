import React, { useContext } from "react";
import { Context } from "../../App";

export default function ArtistInfo(props) {
  const context = useContext(Context);

  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{ width: "100%" }}
    >
      <div className="d-flex flex-column align-items-center py-4">
        <h4 className="color-primary">
            {props.artist.display_name}
            </h4>
        <p className="mt-2">
          <b>Nationality: </b> 
          {props.artist.nationality}
        </p>
        <p className="mt-1">
          <b>Birth/Death Date: </b> 
          {props.artist.display_date}
        </p>
        <p className="mt-1 mx-5" style={{ textAlign: "center" }}>
          <b>Biography: </b> 
          {props.artist.bio}
        </p>
      </div>
      <div
        className="d-flex flex-column align-items-center"
        style={{ width: "90%" }}
      >
        <h4 className="color-dark mb-2">Artworks</h4>

        <div className="mb-3" style={{ width: "100%" }}>
          <table id="artworks" style={{ width: "100%" }}>
            <thead>
              <tr className="background-dark color-white">
                <th>Title</th>
                <th>Classification</th>
                <th>Display Date</th>
                <th>Medium</th>
                <th>Region</th>
                <th>Dimensions</th>
              </tr>
            </thead>

            <tbody className="color-dark">
              {props.artist.works.length > 0 ? (
                props.artist.works.map((data, key) => {
                  return (
                    <tr className="border-top" key={key}>
                      <td>{data.title}</td>
                      <td>{data.classification}</td>
                      <td>{data.displayDate}</td>
                      <td>{data.medium}</td>
                      <td>Region 5</td>
                      <td>{data.dimensions}</td>
                    </tr>
                  );
                })
              ) : (
                <div className="text-center">No data found</div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
