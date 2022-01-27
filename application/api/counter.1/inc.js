({
  access: 'public',
  method: async () => {
    domain.counter.inc();
    return domain.counter.state;
  }
});
