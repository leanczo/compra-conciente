import { useState } from 'react';

interface Option {
  value: number;
  label: string;
}

interface Question {
  id: string;
  question: string;
  type: string;
  options: Option[];
}

const PurchaseDecisionQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);

  const questions: Question[] = [
    {
      id: 'necessity',
      question: '¿Realmente necesitas este producto ahora mismo?',
      type: 'scale',
      options: [
        { value: 3, label: 'Es absolutamente necesario' },
        { value: 2, label: 'Lo necesito pero no es urgente' },
        { value: 1, label: 'Me gustaría tenerlo' },
        { value: 0, label: 'Es solo un capricho' }
      ]
    },
    {
      id: 'budget',
      question: '¿Tienes el dinero disponible sin afectar tus gastos esenciales?',
      type: 'scale',
      options: [
        { value: 3, label: 'Sí, está dentro de mi presupuesto' },
        { value: 2, label: 'Sí, pero tendré que ajustar otros gastos' },
        { value: 1, label: 'Tendría que usar mis ahorros' },
        { value: 0, label: 'Tendría que usar crédito o endeudamiento' }
      ]
    },
    {
      id: 'alternatives',
      question: '¿Has considerado alternativas más económicas?',
      type: 'scale',
      options: [
        { value: 3, label: 'Sí, y esta es la mejor opción' },
        { value: 2, label: 'Sí, pero prefiero esta opción' },
        { value: 1, label: 'He visto algunas alternativas' },
        { value: 0, label: 'No he buscado alternativas' }
      ]
    },
    {
      id: 'usage',
      question: '¿Con qué frecuencia usarás este producto?',
      type: 'scale',
      options: [
        { value: 3, label: 'Diariamente o muy frecuentemente' },
        { value: 2, label: 'Varias veces a la semana' },
        { value: 1, label: 'Ocasionalmente' },
        { value: 0, label: 'Muy raramente o no estoy seguro/a' }
      ]
    },
    {
      id: 'timing',
      question: '¿Has esperado al menos 24 horas antes de decidir comprar?',
      type: 'scale',
      options: [
        { value: 3, label: 'He pensado en esto durante semanas' },
        { value: 2, label: 'Lo he considerado durante varios días' },
        { value: 1, label: 'Lo pensé ayer' },
        { value: 0, label: 'Es una decisión impulsiva de hoy' }
      ]
    },
    {
      id: 'space',
      question: '¿Tienes espacio y lugar apropiado para este producto?',
      type: 'scale',
      options: [
        { value: 3, label: 'Sí, tengo el lugar perfecto' },
        { value: 2, label: 'Sí, aunque tendré que reorganizar un poco' },
        { value: 1, label: 'Tendré que hacer espacio significativo' },
        { value: 0, label: 'No tengo espacio adecuado' }
      ]
    },
    {
      id: 'similar',
      question: '¿Ya tienes algo similar que podría cumplir la misma función?',
      type: 'scale',
      options: [
        { value: 0, label: 'Sí, tengo algo que funciona igual de bien' },
        { value: 1, label: 'Tengo algo similar pero menos eficiente' },
        { value: 2, label: 'Tengo algo relacionado pero diferente' },
        { value: 3, label: 'No tengo nada parecido' }
      ]
    },
    {
      id: 'research',
      question: '¿Has investigado sobre el producto, precios y reseñas?',
      type: 'scale',
      options: [
        { value: 3, label: 'Sí, he investigado a fondo' },
        { value: 2, label: 'He hecho investigación básica' },
        { value: 1, label: 'He leído algunas reseñas' },
        { value: 0, label: 'No he investigado' }
      ]
    }
  ];

  const handleAnswer = (value: number) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateScore = () => {
    const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
    const maxScore = questions.length * 3;
    return (totalScore / maxScore) * 100;
  };

  const getRecommendation = () => {
    const score = calculateScore();

    if (score >= 80) {
      return {
        decision: '✅ ADELANTE CON LA COMPRA',
        color: 'text-gray-800',
        background: 'bg-gray-100',
        message: 'Basándose en tus respuestas, esta parece ser una compra bien pensada y justificada. Has considerado los aspectos importantes y la compra se alinea con tus necesidades y posibilidades.'
      };
    } else if (score >= 60) {
      return {
        decision: '⚠️ CONSIDERA ESPERAR',
        color: 'text-gray-700',
        background: 'bg-gray-50',
        message: 'Tu compra tiene algunos puntos a favor, pero también algunas áreas de preocupación. Considera esperar un poco más, investigar alternativas o asegurarte de que realmente encaja en tu presupuesto y necesidades.'
      };
    } else {
      return {
        decision: '❌ MEJOR NO COMPRES AHORA',
        color: 'text-gray-800',
        background: 'bg-gray-100',
        message: 'Basándose en tus respuestas, esta compra parece ser más impulsiva que necesaria. Te recomendamos esperar, reflexionar más y posiblemente buscar alternativas antes de proceder.'
      };
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
  };

  if (showResult) {
    const recommendation = getRecommendation();
    const score = calculateScore();

    return (
      <div className="max-w-2xl mx-auto p-6 bg-white min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-gray-800 mb-2">Resultado del Análisis</h1>
          <div className="w-16 h-1 bg-gray-800 mx-auto"></div>
        </div>

        <div className={`${recommendation.background} border border-gray-300 rounded-lg p-8 mb-8`}>
          <h2 className={`text-2xl font-medium ${recommendation.color} mb-4 text-center`}>
            {recommendation.decision}
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed text-center mb-6">
            {recommendation.message}
          </p>
          <div className="text-center">
            <span className="text-gray-600">Puntuación: </span>
            <span className="font-medium text-gray-800">{Math.round(score)}%</span>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={resetQuiz}
            className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
          >
            Evaluar otra compra
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-light text-gray-800 mb-2">Compra Consciente</h1>
        <div className="w-16 h-1 bg-gray-800 mx-auto mb-4"></div>
        <p className="text-gray-600">Pregunta {currentQuestion + 1} de {questions.length}</p>
      </div>

      <div className="mb-8">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-gray-800 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        <h2 className="text-2xl font-light text-gray-800 mb-8 text-center leading-relaxed">
          {questions[currentQuestion].question}
        </h2>

        <div className="space-y-4">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.value)}
              className="w-full p-4 text-left border border-gray-300 rounded-lg hover:border-gray-800 hover:bg-gray-50 transition-all duration-200 group"
            >
              <span className="text-gray-800 font-medium group-hover:text-gray-900">
                {option.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {currentQuestion > 0 && (
        <div className="text-center">
          <button
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200 underline"
          >
            ← Pregunta anterior
          </button>
        </div>
      )}
    </div>
  );
};

export default PurchaseDecisionQuiz;
