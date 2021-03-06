import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Meteor } from 'meteor/meteor';

import './partyDetails.html';
import { Parties } from '../../../api/parties/index';
import { name as PartyUninvited } from '../partyUninvited/partyUninvited';

class PartyDetails {
  constructor($stateParams, $scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.subscribe('parties');
    this.subscribe('users');

    this.partyId = $stateParams.partyId;

    this.helpers({
      party() {
        return Parties.findOne({
          _id: $stateParams.partyId
        });
      },
      users() {
        return Meteor.users.find({});
      }
    });
  }

  save() {
    Parties.update({
      _id: this.party._id
    }, {
      $set: {
        name: this.party.name,
        description: this.party.description,
        public: this.party.public
      }
    }, (error) => {
      if (error) {
        console.log(error);
        alert('Oops, unable to update the party...');
      } else {
        alert('OK');
      }
    });
  }
}

const name = 'partyDetails';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  PartyUninvited
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: PartyDetails
})
.config(config);

function config($stateProvider) {
  'ngInject';

  $stateProvider.state('partyDetails', {
    url: '/parties/:partyId',
    template: '<party-details></party-details>',
    resolve: {
      currentUser($q) {
        if (Meteor.userId() === null) {
          return $q.reject('AUTH_REQUIRED');
        } else {
          return $q.resolve();
        }
      }
    }
  });
}
