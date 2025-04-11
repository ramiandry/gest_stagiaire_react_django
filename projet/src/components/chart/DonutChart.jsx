import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import useFetchCand from '../../hooks/useFetchCand';

// Enregistrer les composants nécessaires pour un donut chart
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const DonutChart = () => {
    const { fetchCandidature, data: dataCand } = useFetchCand()
    const [candidatures, setCandidatures] = useState([]);

    useEffect(() => {
      if (dataCand) {
        setCandidatures(dataCand)
      } else {
        fetchCandidature()
      }
    }, [dataCand])

    // Compter le nombre total de demandes par statut
    const statusCounts = candidatures.reduce((acc, submission) => {
      const status = submission.statut === 'Accepter' ? 'Accepté' :
                     submission.statut === 'Refuser' ? 'Refusé' :
                     submission.statut === 'En attente' ? 'En attente' :
                     submission.statut;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    // Préparer les données pour le donut chart
    const data = {
      labels: Object.keys(statusCounts),
      datasets: [
        {
          data: Object.values(statusCounts),
          backgroundColor: [
            'rgb(76, 175, 80)',   // Rose pour Accepté
            'rgb(244, 67, 54)',   // Orange pour Refusé
            'rgb(255, 193, 7)'   // Violet pour En attente
          ],
          borderColor: [
            'rgb(76, 175, 80)',   // Rose pour Accepté
            'rgb(244, 67, 54)',   // Orange pour Refusé
            'rgb(255, 193, 7)'   // Violet pour En attente
          ],
          borderWidth: 1
        }
      ]
    };

    // Options du graphique (spécifiques au donut)
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '60%', // Crée l'effet d'anneau
      plugins: {
        title: {
          display: false,
          text: 'Répartition des demandes par statut'
        },
        legend: {
          display: false,
          position: 'top'
        }
      }
    };

    // Style du conteneur
    const containerStyle = {
      width: '100%',
      height: '100vh'
    };

    return (
      <div style={containerStyle}>
        <Doughnut data={data} options={options} />
      </div>
    );
};

export default DonutChart;