'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.bulkInsert('Dropdowns', [{
    //   label: 'banks',
    // },{
    //   label: 'creditApprovers',
    // },{
    //   label: 'miniLabStatus',
    // },{
    //   label: 'labStatus',
    // },{
    //   label: 'xRayStatus',
    // },{
    //   label: 'radiographers',
    // },]);
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
