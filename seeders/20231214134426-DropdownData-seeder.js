'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('DropdownData', [{
      label: 'BOC',
      dropdownId: 1
    },{
      label: 'HNB',
      dropdownId: 1
    },{
      label: 'Sampath Bank',
      dropdownId: 1
    },{
      label: 'Commercial Bank',
      dropdownId: 1
    },{
      label: 'Mr.Rohan',
      dropdownId: 2
    },{
      label: 'Mr. Mario',
      dropdownId: 2
    },{
      label: 'Blood Extracted',
      dropdownId: 3
    },{
      label: 'Approved',
      dropdownId: 3
    },{
      label: 'Not Approved',
      dropdownId: 3
    },{
      label: 'Approved',
      dropdownId: 4
    },{
      label: 'Not Approved',
      dropdownId: 4
    },{
      label: 'Normal',
      dropdownId: 5
    },{
      label: 'Abnormal',
      dropdownId: 5
    },{
      label: 'Repeat',
      dropdownId: 5
    },{
      label: 'Taken',
      dropdownId: 5
    },{
      label: 'Pending',
      dropdownId: 5
    },{
      label: 'John Doe',
      dropdownId: 6
    },{
      label: 'Paul Morphy',
      dropdownId: 6
    },]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
