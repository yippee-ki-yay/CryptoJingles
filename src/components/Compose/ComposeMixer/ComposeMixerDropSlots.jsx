import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { guid } from '../../../services/generalService';
import { handleSampleDrop, handleSampleDropCancel } from '../../../actions/composeActions';
import SampleSlot from '../../SampleSlot/SampleSlot';

export const ComposeMixerDropSlots = ({ sampleSlots, handleSampleDrop, handleSampleDropCancel }) => (
  <div className="sample-slots-wrapper">
    {
      sampleSlots.map(({ accepts, lastDroppedItem }, index) =>
        (<SampleSlot
          key={`item-${guid()}`}
          index={index}
          accepts={accepts}
          lastDroppedItem={lastDroppedItem}
          id={index}
          onDrop={item => handleSampleDrop(index, item)}
          cancelDrop={item => handleSampleDropCancel(index, item)}
        />))
    }
  </div>
);

ComposeMixerDropSlots.propTypes = {
  sampleSlots: PropTypes.array.isRequired,
  handleSampleDrop: PropTypes.func.isRequired,
  handleSampleDropCancel: PropTypes.func.isRequired,
};

const mapStateToProps = ({ compose }) => ({
  sampleSlots: compose.sampleSlots,
});

const mapDispatchToProps = {
  handleSampleDrop,
  handleSampleDropCancel,
};

export default connect(mapStateToProps, mapDispatchToProps)(ComposeMixerDropSlots);
