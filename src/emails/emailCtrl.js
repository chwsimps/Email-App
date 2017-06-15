import _ from 'lodash';

export default function($scope, $http, $timeout, $window) {
  $http.get('api/emails.json').then(response => {
     const emails = response.data.messages;
     $scope.emails = emails;
     $scope.inboxCount = emails.length;

     const totalTagCount = _.filter(emails, (email) => {
       if (email.tags.length) {
         return email;
       }
     });

     $scope.totalTagCount = totalTagCount.length;
  });

  // Filter emails
  $scope.filterEmails = function(filter) {
      switch(filter) {
        case 'all':
          $scope.search = '';
          break;
        case 'travel':
          $scope.search = 'travel';
          break;
        case 'work':
          $scope.search = 'work';
      }
  };

  // Active Class for Tabs
  $scope.activeTab = function(tab) {
    document.getElementById('primaryTab').classList.remove('active');
    document.getElementById('workTab').classList.remove('active');
    document.getElementById('travelTab').classList.remove('active');

    if (tab == 'primary') {
      document.getElementById('primaryTab').classList.add('active');
    } else if (tab == 'work') {
      document.getElementById('workTab').classList.add('active');
    } else if (tab == 'travel') {
      document.getElementById('travelTab').classList.add('active');
    }
  };

  // Tags Count
  $scope.tagsCount = function() {
    $timeout(() => {
       $scope.totalTravelCount = document.querySelectorAll('.email_tags .travel').length;
       $scope.totalWorkCount = document.querySelectorAll('.email_tags .work').length;
    });
  };

  // Sidebar Section
  $scope.today = new Date();

  //Toggle Tags in Sidebar
  $scope.showTag = false;

  $scope.toggleTags = function() {
    $scope.showTag = !$scope.showTag;
  };

  // Selected Checkboxes
  $scope.selectedEmail = [];

  $scope.checkedEmail = function(email) {
    return $scope.selectedEmail.indexOf(email) > -1;
  };

  $scope.toggleSelectedEmails = function(email) {
    let id = $scope.selectedEmail.indexOf(email);

    if (id > -1) {
      $scope.selectedEmail.splice(id, 1);
    } else {
      $scope.selectedEmail.push(email);
    }
  };

  // Delete emails
  $scope.deleteEmails = function(emailToDelete) {
    _.map(emailToDelete, (deleted) => {
      _.remove($scope.emails, email => email.id === deleted);
      $scope.inboxCount = $scope.emails.length;
    });

    const totalTagCount = _.filter($scope.emails, (email) => {
      if (email.tags.length) {
        return email;
      }
    });

    $scope.totalTagCount = totalTagCount.length;
    $scope.totalTravelCount = 0;
    $scope.totalWorkCount = 0;

    _.filter($scope.emails, (email) => {
      _.map(email.tags, tag => {

        if (tag == "travel") {
          $scope.totalTravelCount++;
        } else {
          $scope.totalWorkCount++;
        }
      });
    });
  };

  // View email
  $scope.viewEmail = false;
  $scope.checkEmail = function(email) {
    $scope.viewEmail = true;
    $scope.detailedEmail = email;
    $scope.selectedEmail = [];
  };

  // Go Back to Email List
  $scope.backToEmailList = function() {
    $scope.viewEmail = false;
  };
}
