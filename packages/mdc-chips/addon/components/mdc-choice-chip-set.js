import ChipSetComponent from './mdc-chip-set';
import listener from 'ember-cli-mdc-base/listener';

import { get, action } from '@ember/object';
import { isPresent } from '@ember/utils';
import { assert } from '@ember/debug';

function noOp () {}

export default class MdcChoiceChipSetComponent extends ChipSetComponent {
  type = 'choice';

  _currentChoiceId = null;

  didSelection (chipId, selected) {
    if (isPresent (this.args.chips)) {
      // The user has provide a list of chips. We are going to either return the chip
      // that was selected, or return null.

      if (selected) {
        // Locate the index of the selected chip, and return that one to the user.
        let chip = this.findChipById (chipId);
        assert (`The choice chip set does not have a chip with the id ${chipId}`, isPresent (chip));

        this.notifyChange (chip);
      }
      else {
        this.notifyChange (null);
      }
    }
    else {
      // The user did block creation of the choice chip set. We therefore are just going
      // to return the selection information to the user.

      super.selection (ev);
    }
  }

  notifyChange (choice) {
    this._currentChoiceId = isPresent (choice) ? this.getChipId (choice) : null;
    this.change (choice);
  }

  get change () {
    return this.args.change || noOp;
  }

  get syncKey () {
    return this.args.choice;
  }

  @action
  sync () {
    // We need to locate the chip that was selected.
    let choice = this.syncKey;

    if (isPresent (choice)) {
      // There was a outside change. We need to select the chip that matches the
      // change if the choice is different from the current one.

      let chipId = this.getChipId (choice);

      if (this._currentChoiceId !== chipId) {
        this.select (chipId);
        this._currentChoiceId = chipId;
      }
    }
    else if (isPresent (this._currentChoiceId)) {
      // There is no selection. This means we need to clear the selection.
      this.select (null);
      this._currentChoiceId = null;
    }
  }
}
