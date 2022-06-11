import React, { memo } from 'react';

import './Footer.scss';

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

      <div className="text-center p-3">
        Yaremenko Maksym
      </div>
    </footer>
  );
});
