export const gotoGithub = () => {
  window.open('https://github.com/food-billboard', '_blank');
};

export const gotoBlog = () => {
  window.open('https://food-billboard.github.io/', '_blank');
};

export const gotoOperation = () => {
  window.open(
    `http://${process.env.RASPBERRY_IP}/api/backend/create-chart-docs/index.html`,
    '_blank',
  );
};

export const gotoIssue = () => {
  window.open(
    'https://github.com/food-billboard/create-chart/issues',
    '_blank',
  );
};
