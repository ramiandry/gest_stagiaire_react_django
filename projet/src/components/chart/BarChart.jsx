import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import useFetchCand from '../../hooks/useFetchCand';

// Enregistrer tous les composants nécessaires
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);




const BarChart = () => {
    const { fetchCandidature, data: dataCand } = useFetchCand()
    const [candidatures, setCandidatures] = useState([]);
    useEffect(() => {
      if (dataCand) {
        setCandidatures(dataCand)
      }else{
        fetchCandidature()
      }
    }, [dataCand])
//   const submissions = [
//     { id: 2, dateSoumission: "2025-03-23", statut: "Terminer", message: "Autem dolores enim u", candidat: 3, stage: 1 },
//     { id: 3, dateSoumission: "2025-03-23", statut: "Accepter", message: "je suis très motivée pour ce poste", candidat: 4, stage: 1 },
//     { id: 4, dateSoumission: "2025-03-15", statut: "Terminer", message: "Autem dolores enim u", candidat: 5, stage: 2 },
//     { id: 5, dateSoumission: "2025-04-05", statut: "Accepter", message: "Très intéressé par ce poste", candidat: 6, stage: 3 },
//     { id: 6, dateSoumission: "2025-05-10", statut: "Accepter", message: "Je suis motivé", candidat: 7, stage: 2 },
//     { id: 7, dateSoumission: "2025-05-20", statut: "Terminer", message: "Motivation pour ce stage", candidat: 8, stage: 1 },
//     { id: 8, dateSoumission: "2025-06-10", statut: "Rejected", message: "Dommage", candidat: 9, stage: 1 },
//     { id: 9, dateSoumission: "2025-06-12", statut: "Terminer", message: "Bonne chance pour cette offre", candidat: 10, stage: 2 },
//     { id: 10, dateSoumission: "2025-07-01", statut: "Accepter", message: "Très intéressé", candidat: 11, stage: 3 },
//     { id: 11, dateSoumission: "2025-07-15", statut: "Rejected", message: "Je ne peux pas accepter", candidat: 12, stage: 2 },
//     { id: 12, dateSoumission: "2025-08-05", statut: "Terminer", message: "Bon entretien", candidat: 13, stage: 1 },
//     { id: 13, dateSoumission: "2025-08-20", statut: "Rejected", message: "Je n'ai pas le temps", candidat: 14, stage: 3 }
//   ];

  // Fonction pour obtenir le mois
  const getMonth = (date) => {
    const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    const dateObj = new Date(date);
    return months[dateObj.getMonth()];
  };

  // Grouper les données par mois
  const groupedData = candidatures.reduce((acc, submission) => {
    const month = getMonth(submission.dateSoumission);
    if (!acc[month]) {
      acc[month] = { total: 0, Accepter: 0, Rejected: 0 };
    }
    acc[month].total += 1;
    acc[month][submission.statut] = (acc[month][submission.statut] || 0) + 1;
    return acc;
  }, {});

  // Créer des tableaux pour chaque status
  const allMonths = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  
  const totalData = allMonths.map(month => groupedData[month] ? groupedData[month].total : 0);
  const accepterData = allMonths.map(month => groupedData[month] ? groupedData[month].Accepter : 0);
  const rejectedData = allMonths.map(month => groupedData[month] ? groupedData[month].Rejected : 0);

  // Configuration des données du graphique
  const data = {
    labels: allMonths,
    datasets: [
      {
        label: 'Total Demandes',
        data: totalData,
        backgroundColor: 'rgb(33, 150, 243)',
        borderColor: 'rgb(33, 150, 243)',
        borderWidth: 1
      },
      {
        label: 'Accepté',
        data: accepterData,
        backgroundColor: 'rgb(76, 175, 80)',
        borderColor: 'rgb(76, 175, 80)',
        borderWidth: 1
      },
      {
        label: 'Rejeté',
        data: rejectedData,
        backgroundColor: 'rgb(244, 67, 54)',
        borderColor: 'rgb(244, 67, 54)',
        borderWidth: 1
      }
    ]
  };

  // Options du graphique
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Permet de redimensionner librement
    plugins: {
      title: {
        display: false,
        text: 'Répartition des demandes par mois'
      },
      tooltip: {
        enabled: true
      },
      legend: {
        display: false,
        position: 'top'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Nombre de demandes'
        }
      }
    }
  };

  // Style du conteneur pour remplir l'écran
  const containerStyle = {
    width: '100%',
    height: '100vh' // Hauteur de 100% de la fenêtre
  };

  return (
    <div style={containerStyle}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;