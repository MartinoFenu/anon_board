import React from 'react';
import CustomLink from '../UI/CustomLink/CustomLink';
const Footer = () => {

  return (
    <footer>
      <div className='ft_first_row'>
        <span>Made with fun by <a href="https://www.martinofenu.it"> Martino Fenu</a> | </span>
        <CustomLink to='/privacy'>Privacy Policy</CustomLink>
      </div>
      <div className='ft_second_row'>
        <p>
          Based on the <a href="https://www.freecodecamp.org/learn/information-security-and-quality-assurance/information-security-and-quality-assurance-projects/anonymous-message-board">build an Anonymous Message Board</a> freeCodeCamp challenge.
        </p>
      </div>
    </footer>
  )
}

export default Footer;
