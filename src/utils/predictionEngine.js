export default function(context, alphabet) {
  let prediction = [];

  for (let i = 0; i < 27; i++) {
    prediction.push(1 / 27);
  }
  return prediction;
}
