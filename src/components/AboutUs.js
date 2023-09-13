import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import inetumImage from './images/Inetum.jpeg'; // Import your company image

const AboutUs = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
              À propos de nous
            </Typography>
            <Typography variant="body1" paragraph sx={{ textAlign: 'justify', fontSize: '1.2rem' }}>
              Inetum, une entreprise de services informatiques agile, fournit des solutions numériques et des services. En tant que groupe mondial, elle aide les entreprises et les institutions à optimiser leurs activités dans un monde en constante évolution, où les besoins et les pratiques évoluent en permanence. Le groupe Inetum s'engage à innover, à s'adapter continuellement et à rester en avance aux côtés de ses partenaires.
            </Typography>
            <Typography variant="body1" paragraph sx={{ textAlign: 'justify', fontSize: '1.2rem' }}>
              Grâce à son expertise variée, Inetum propose à ses clients une combinaison unique de proximité, d'expertise sectorielle et de solutions de haute qualité. Présent dans plus de 27 pays, le groupe compte environ 27 000 collaborateurs et a généré un chiffre d'affaires de 2,4 milliards d'euros en 2022.
            </Typography>
          </Paper>
        </Grid>
        <Grid item sx={{ marginLeft: '5%', marginTop: '6%' }}>
          <Paper elevation={5}>
            <img src={inetumImage} alt="Inetum" style={{ width: '122%', height: '110%' }} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutUs;
