import React, { memo } from 'react';

export const Footer: React.FC = memo(() => {
  return (
    <footer className="bg-dark text-center text-white">
      <div className="container pt-4">
        <section className="mb-4">
          <a
            className="btn btn-floating btn-lg m-1 myLink"
            href="https://www.linkedin.com/in/maksym-yaremenko-a68530239/"
            rel="noreferrer"
            target="_blank"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>

          <a
            className="btn btn-floating btn-lg m-1 myLink"
            href="https://github.com/yaremenko-maksym"
            rel="noreferrer"
            target="_blank"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i className="fab fa-github"></i>
          </a>
        </section>
      </div>

      <div className="text-center p-3 d-flex flex-column flex-md-row gap-3 justify-content-center align-items-center">
        {'Prodject by Yaremenko Maksym '}
        <a
          className="myLink btn"
          target="_blank"
          href="https://www.freeprivacypolicy.com/live/91818545-f675-46d1-861b-eb73bf20319a"
          rel="noreferrer"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
});
