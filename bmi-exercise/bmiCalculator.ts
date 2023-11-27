const calculateBmi = (height: number, weight: number): string => {
    // bmi = mass (kg) / height² (m²)
    const bmi = weight / Math.pow(height / 100, 2);
    if (bmi < 16.0) {
        return `Underweight (Severe thinness) (${height}, ${weight})`;
    } else if (bmi > 16.0 && bmi < 16.9) {
        return `Underweight (Moderate thinness) (${height}, ${weight})`;
    } else if (bmi > 16.0 && bmi < 16.9) {
        return `Underweight (Moderate thinness) (${height}, ${weight})`;
    } else if (bmi > 17.0 && bmi < 18.4) {
        return `Underweight (Mild thinness) (${height}, ${weight})`;
    } else if (bmi > 18.5 && bmi < 24.9) {
        return `Normal range (${height}, ${weight})`;
    } else if (bmi > 25.0 && bmi < 29.9) {
        return `Overweight (Pre-obese) (${height}, ${weight})`;
    } else if (bmi > 30.0 && bmi < 34.9) {
        return `Obese (Class I) (${height}, ${weight})`;
    } else if (bmi > 35.0 && bmi < 39.9) {
        return `Obese (Class II) (${height}, ${weight})`;
    } else if (bmi <= 40.0) {
        return `Obese (Class III) (${height}, ${weight})`;
    }
};

console.log(calculateBmi(180, 74));
