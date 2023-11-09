export default  (value) => {
  return (
    !value ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'sttring' && value.trim().length === 0)
  );
};
