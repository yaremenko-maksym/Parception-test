import React, { memo } from 'react';

export const HomePage: React.FC = memo(() => {
  return (
    <div className="container rounded-6 bg-dark mt-3 mb-3 p-5">
      <h1 className="display-3 text-center text-light mb-5">
        <strong>
          Welcome to my &quot;Rick and Morty&quot; project
        </strong>
      </h1>

      <p className="text-light mb-2">Description :</p>

      <div className="accordion border border-2 rounded" id="accordionFlushExample">
        <div className="accordion-item bg-dark border-bottom">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button bg-dark text-light"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Functionality
            </button>
          </h2>

          <div
            id="collapseOne"
            className="accordion-collapse collapse show text-light"
            aria-labelledby="headingOne"
            data-mdb-parent="#accordionExample"
          >
            <div className="accordion-body">
              <dl className="row">
                <dt className="col-sm-3 mb-3 text-success">
                  Tab autocomplete
                </dt>
                <dd className="col-sm-9">
                  Press tab when using search
                </dd>

                <dt className="col-sm-3 mb-3 text-success">
                  Arrow navigation
                </dt>
                <dd className="col-sm-9">
                  Press up/down arrow when using search
                </dd>

                <dt className="col-sm-3 mb-3 text-success">
                  Enter search
                </dt>
                <dd className="col-sm-9">
                  Press enter to go to character page
                </dd>

                <dt className="col-sm-3 mb-3 text-success">
                  Pagination
                </dt>
                <dd className="col-sm-9">
                  Use pagination to navigate through the list
                </dd>

                <dt className="col-sm-3 mb-3 text-success">
                  Like/dislike
                </dt>
                <dd className="col-sm-9">
                  To like/dislike you need to authorize with facebook
                </dd>

                <dt className="col-sm-3 mb-3 text-success">
                  Saved list of liked/disliked
                </dt>
                <dd className="col-sm-9">
                  Data about your liked/disliked characters/locations/episodes saved in
                  {' '}
                  <b className="text-warning">localStorage</b>
                </dd>

                <dt className="col-sm-3 mb-3 text-success">
                  Change character photo
                </dt>
                <dd className="col-sm-9">
                  Only for authorized users
                </dd>
              </dl>

              <p className="note note-danger text-dark">
                <strong>Note :</strong>
                {' '}
                To get all the functionality make sure that you are logged in with a Facebook!
              </p>
            </div>
          </div>
        </div>

        <div className="accordion-item bg-dark">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed bg-dark text-light"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Technologies
            </button>
          </h2>

          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-mdb-parent="#accordionExample"
          >
            <div className="accordion-body">
              <ul className="list-inline">
                <li className="list-inline-item myLink">React</li>
                <li className="list-inline-item myLink">TypeScript</li>
                <li className="list-inline-item myLink">React Router v6</li>
                <li className="list-inline-item myLink">Redux Toolkit</li>
                <li className="list-inline-item myLink">SCSS</li>
                <li className="list-inline-item myLink">Facebook Auth API</li>
                <li className="list-inline-item myLink">MDBootstrap</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
