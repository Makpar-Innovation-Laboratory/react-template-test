export default function Home() {
    const [searchTerm, setSearchTerm] = useState('')
    const context = useContext(Context)
    /**
     *
     */
     const handleChange = event => {
      setSearchTerm(event.target.value);
      console.log(searchTerm)
    };
    function handleSubmit() {
      // let token = Auth.getToken();
  
      let postString =
        "https://api-ccc-dev.makpar-innovation.com/mock-data";
      // let authStr = "Bearer " + String(token);
      // console.log(authStr)
      const options = axios.post(
          postString,
          {},
          {
            // headers: {
            //   Authorization: authStr,
            // },
          }
        )
        .then((res) => {
          console.log(res.data);
          context.updateData(res.data.results)
          // setReturn(res.data.results)
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  
    return (
      <div
        className="d-flex flex-column align-items-center background-light "
        style={{ width: "100%", minHeight: "95vh" }}
      >
        <h2 className="mt-3">Artist Search</h2>
  
        <div
          className="d-flex flex-column align-items-center bg-white py-3"
          style={{ width: "70%", minHeight: "150px" }}
        >
          <label className="color-dark">Enter Artist Name</label>
          <input
            className="mt-3"
            placeholder="Search"
            style={{ width: "400px" }}
            value={searchTerm}
            onChange={handleChange}
          />
          <button className="btn btn-round-primary mt-3" type="button" onClick={handleSubmit}>Search</button>
        </div>
  
        <div
          className="d-flex flex-column align-items-center bg-white mt-4"
          style={{ width: "70%", minHeight: "40vh" }}
        >
          <div className="d-flex flex-column align-items-center py-4">
            <h4 className="color-primary">Artist Info</h4>
  
            {/* <p>Enter an artist name to see info</p> */}
            <div className="mt-4" id="customers" style={{ minWidth: "700px" }}>
              <div
                className="d-flex flex-row justify-content-between border-top px-5 py-2"
                id="table-body"
              >
                <p>
                  <b>Name:</b>
                </p>
                <p className="text-right">John Doe</p>
              </div>
              <div
                className="d-flex flex-row justify-content-between border-top px-5 py-2"
                id="table-body"
              >
                <p>
                  <b>Birth/Death Dates:</b>
                </p>
                <p className="text-right">01/01/1970 - 01/01/2016</p>
              </div>
              <div
                className="d-flex flex-row justify-content-between border-top px-5 py-2"
                id="table-body"
              >
                <p>
                  <b>Biographical Information:</b>
                </p>
                <p className="text-right">United States</p>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column align-items-center py-4">
            <h4 className="color-primary mb-4">Artworks</h4>
  
            <div
              className="border d-flex flex-column align-items-center justify-content-between "
              style={{ width: "350px", height: "330px" }}
            >
              <h5 className="mt-2">Title of Artwork</h5>
              <div
                className="d-flex flex-column align-items-center mb-2"
                style={{ width: "70%" }}
              >
                <p>Classification: placeholder</p>
                <p className="mt-1">Display Date: 01/01/2021</p>
              </div>
              <div
                className="background-dark"
                style={{ width: "100%", minHeight: "220px" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }