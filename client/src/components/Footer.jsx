import React from 'react'
import { Link } from 'react-router-dom';
const Footer = () => {
    return(
        <div class="container-fluid bg-light fixed-bottom">
            <div class="container">
                <div class="row">

                    <div className="col-4 pt-4 text-center">
                    <Link href="https://github.com/JorgeeeCerdan"><i class="text-dark bi-github" role="img" aria-label="GitHub"></i></Link>
                    </div>

                    <div className="col-4 pt-4 text-center">
                    <p>Copyright © Jorge Cerdán 2021</p>
                    </div>
                    
                    <div className="col-4 pt-4 text-center">
                    <Link href="www.linkedin.com/in/jorge-cerdán-lázaro-jcl"><i class="text-dark bi bi-linkedin"></i></Link>
                    </div>
              </div>
            </div>
        </div>        
    )
}
export default Footer;