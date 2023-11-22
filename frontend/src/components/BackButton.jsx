import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import PropTypes from "prop-types";

const BackButton = ({ destination = "/" }) => {
  return (
    <div className="flex">
      <Link
        to={destination}
        aria-label="back-button"
        className="text-gray-800 rounded-lg w-fit"
      >
        <FaArrowLeft aria-label="back-button" className="text-2xl" />
      </Link>
    </div>
  );
};

BackButton.propTypes = {
  destination: PropTypes.oneOfType(PropTypes.string).isRequired,
};

export default BackButton;
