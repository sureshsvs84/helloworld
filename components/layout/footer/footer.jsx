import React,{ Fragment }from 'react';
import './footer.scss';

class Footer extends React.Component{
    render(){
        return(
            <Fragment>
            <footer className="page-footer">
              <div className="footer-copyright">
                <div className="container">
                  <span>Copyright © 2019 All rights reserved.</span>
                  <span className="right hide-on-small-only"> Design and Developed by </span>

                </div>
              </div>
            </footer>
          </Fragment>
        )
    }
}

export default Footer; 
