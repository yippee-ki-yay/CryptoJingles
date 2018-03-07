import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tooltip from '../../Tooltip/Tooltip';

import { createNewJingle, handleNewJingleNameChange } from '../../../actions/composeActions';

const NewJingleNameForm = ({ handleNewJingleNameChange, droppedSampleIds, createNewJingle }) => (
  <form onSubmit={(e) => { e.preventDefault(); }} className="form-horizontal create-jingle-form">
    <h4>Compose jingle:</h4>
    <div>
      <input
        className="form-control"
        placeholder="Jingle name"
        type="text"
        onChange={handleNewJingleNameChange}
      />

      <Tooltip
        content="All slots must contain a sample in order to compose a jingle"
        useHover={droppedSampleIds.length < 5}
      >
        <button
          type="submit"
          className={`btn buy-button ${droppedSampleIds.length < 5 && 'disabled'}`}
          onClick={createNewJingle}
        >
          Submit
        </button>
      </Tooltip>
    </div>
  </form>
);

NewJingleNameForm.propTypes = {
  droppedSampleIds: PropTypes.array.isRequired,
  handleNewJingleNameChange: PropTypes.func.isRequired,
  createNewJingle: PropTypes.func.isRequired,
};

const mapStateToProps = ({ compose }) => ({
  droppedSampleIds: compose.droppedSampleIds,
});

const mapDispatchToProps = {
  handleNewJingleNameChange, createNewJingle,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewJingleNameForm);
