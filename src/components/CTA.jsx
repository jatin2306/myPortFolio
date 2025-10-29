// import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className='cta'>
      <p className='cta-text'>
        Have a project in mind? <br className='sm:block hidden' />
        Let's build something together!
      </p>
      <button disabled className='btn opacity-50 cursor-not-allowed' style={{ pointerEvents: 'none' }}>
        Contact
      </button>
    </section>
  );
};

export default CTA;
