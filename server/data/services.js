/**
 * Simulated services data
 * In production, this would come from MongoDB
 */

const services = [
  {
    id: 1,
    title: 'PLC Programming',
    shortDescription: 'Custom PLC solutions for industrial automation',
    description: 'We provide expert PLC programming services using industry-leading platforms including Siemens, Allen-Bradley, and Mitsubishi. Our engineers design, develop, and implement control logic tailored to your specific manufacturing requirements.',
    icon: 'cpu',
    features: [
      'Ladder logic and structured text programming',
      'HMI integration and development',
      'System troubleshooting and optimization',
      'Legacy system migration and upgrades',
      'Remote monitoring setup'
    ],
    image: '/images/plc-programming.jpg'
  },
  {
    id: 2,
    title: 'Panel Wiring',
    shortDescription: 'Professional control panel design and fabrication',
    description: 'Our certified technicians design and build industrial control panels that meet UL508A and NEC standards. From concept to commissioning, we ensure your electrical systems are safe, reliable, and efficient.',
    icon: 'diagram-3',
    features: [
      'Custom panel design and layout',
      'UL508A certified fabrication',
      'Component selection and procurement',
      'Wiring and assembly',
      'Testing and documentation'
    ],
    image: '/images/panel-wiring.jpg'
  },
  {
    id: 3,
    title: 'SCADA Systems',
    shortDescription: 'Real-time monitoring and supervisory control',
    description: 'We implement SCADA (Supervisory Control and Data Acquisition) systems that give you complete visibility into your operations. Monitor, control, and optimize your processes from anywhere with our custom SCADA solutions.',
    icon: 'graph-up',
    features: [
      'Real-time data visualization',
      'Historical trending and reporting',
      'Alarm management systems',
      'Remote access and mobile monitoring',
      'Integration with existing systems'
    ],
    image: '/images/scada-systems.jpg'
  },
  {
    id: 4,
    title: 'Industrial Networking',
    shortDescription: 'Robust communication infrastructure',
    description: 'We design and implement industrial network architectures that ensure reliable communication between your automation systems. Our solutions support EtherNet/IP, Profinet, Modbus, and other industrial protocols.',
    icon: 'hdd-network',
    features: [
      'Network architecture design',
      'Protocol integration',
      'Cybersecurity implementation',
      'Redundancy and failover systems',
      'Performance optimization'
    ],
    image: '/images/industrial-networking.jpg'
  },
  {
    id: 5,
    title: 'System Integration',
    shortDescription: 'Seamless automation system connectivity',
    description: 'We bring together diverse automation components into a unified, efficient system. Our integration services ensure that PLCs, HMIs, SCADA, and other systems work together seamlessly.',
    icon: 'layers',
    features: [
      'Multi-vendor system integration',
      'Data exchange protocols',
      'MES/ERP connectivity',
      'Cloud integration',
      'Legacy system modernization'
    ],
    image: '/images/system-integration.jpg'
  },
  {
    id: 6,
    title: 'Maintenance & Support',
    shortDescription: '24/7 technical support and preventive maintenance',
    description: 'Keep your automation systems running at peak performance with our comprehensive maintenance and support services. We offer preventive maintenance programs, emergency support, and system upgrades.',
    icon: 'tools',
    features: [
      'Preventive maintenance programs',
      '24/7 emergency support',
      'Remote diagnostics',
      'Spare parts management',
      'Training and documentation'
    ],
    image: '/images/maintenance-support.jpg'
  }
];

// Simulated contact submissions storage
const contactSubmissions = [];

module.exports = { services, contactSubmissions };
