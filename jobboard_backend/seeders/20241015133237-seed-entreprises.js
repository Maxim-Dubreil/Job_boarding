'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Entreprises', [
      {
        nom_entreprise: 'Tech Innovations',
        secteur_activite: 'Technology',
        site_web: 'https://tech-innovations.com',
        description: 'A leading technology company specializing in AI and software development.',
        adresse: '123 Tech Street, San Francisco, CA',
        region: 'California',
        telephone: '1234567890',
        email: 'contact@tech-innovations.com',
        date_creation: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nom_entreprise: 'HealthCare Plus',
        secteur_activite: 'Healthcare',
        site_web: 'https://healthcare-plus.com',
        description: 'Providing world-class healthcare services and telemedicine solutions.',
        adresse: '456 Health Ave, New York, NY',
        region: 'New York',
        telephone: '0987654321',
        email: 'info@healthcare-plus.com',
        date_creation: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nom_entreprise: 'Green World',
        secteur_activite: 'Environment',
        site_web: 'https://greenworld.com',
        description: 'An environmental organization focused on sustainability initiatives.',
        adresse: '789 Green Lane, Austin, TX',
        region: 'Texas',
        telephone: '1231231234',
        email: 'contact@greenworld.com',
        date_creation: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nom_entreprise: 'Global Finance',
        secteur_activite: 'Finance',
        site_web: 'https://globalfinance.com',
        description: 'A financial institution offering investment and banking solutions.',
        adresse: '321 Wall Street, New York, NY',
        region: 'New York',
        telephone: '9876543210',
        email: 'contact@globalfinance.com',
        date_creation: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nom_entreprise: 'AutoMakers Co',
        secteur_activite: 'Automobile',
        site_web: 'https://automakersco.com',
        description: 'Manufacturing innovative and sustainable automotive solutions.',
        adresse: '654 Motor Ave, Detroit, MI',
        region: 'Michigan',
        telephone: '1239876543',
        email: 'info@automakersco.com',
        date_creation: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Entreprises', null, {});
  }
};
