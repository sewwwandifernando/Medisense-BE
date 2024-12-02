'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    // await queryInterface.bulkInsert('Roles', [{
    //   role: 'Reception',
    // },{
    //   role: 'Cashier',
    // },{
    //   role: 'Accounts',
    // },{
    //   role: 'Lab',
    // },{
    //   role: 'Mini LAb',
    // },{
    //   role: 'Doctor',
    // },{
    //   role: 'X-Ray',
    // },]);

  },

  async down (queryInterface, Sequelize) {

    // await queryInterface.bulkDelete('Roles', null, { truncate: true, cascade: true });

  }
};
