import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

      <button
        type="submit"
        className="btn buy-button"
        onClick={createNewJingle}
        disabled={droppedSampleIds.length < 5}
      >
        Submit
      </button>
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
