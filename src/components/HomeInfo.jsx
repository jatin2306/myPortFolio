import { Link } from "react-router-dom";

import { arrow } from "../assets/icons";
import { portfolioData } from "../constants";

const HomeInfo = ({ currentStage }) => {
  const { homeInfo, personal } = portfolioData;

  if (currentStage === 1) {
    const stage1 = homeInfo.stage1;
    return (
      <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
        {stage1.greeting}
        <span className='font-semibold mx-2 text-white'>{stage1.name}</span>
        {stage1.emoji}
        <br />
        {stage1.description}
      </h1>
    );
  }

  if (currentStage === 2) {
    const stage2 = homeInfo.stage2;
    return (
      <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
          {stage2.text}
        </p>

        <div className='flex flex-col gap-3 items-center'>
          {stage2.links.map((link, index) => {
            if (link.type === 'internal') {
              return (
                <Link key={index} to={link.path} className='neo-brutalism-white neo-btn'>
                  {link.text}
                  <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
                </Link>
              );
            } else {
              return (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className='neo-brutalism-white neo-btn'
                >
                  {link.text}
                  <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
                </a>
              );
            }
          })}
        </div>
      </div>
    );
  }

  if (currentStage === 3) {
    const stage3 = homeInfo.stage3;
    return (
      <div className='info-box'>
        <p className='font-medium text-center sm:text-xl'>
          {stage3.text}
        </p>

        {stage3.links.map((link, index) => (
          <Link key={index} to={link.path} className='neo-brutalism-white neo-btn'>
            {link.text}
            <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
          </Link>
        ))}
      </div>
    );
  }

  if (currentStage === 4) {
    const stage4 = homeInfo.stage4;
    return (
      <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
          {stage4.text}
        </p>

        {stage4.links.map((link, index) => (
          <Link key={index} to={link.path} className='neo-brutalism-white neo-btn'>
            {link.text}
            <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
          </Link>
        ))}
      </div>
    );
  }

  return null;
};

export default HomeInfo;
