const sortButton = document.getElementById("sort");

const sortInputArray = (event) => {
    event.preventDefault();

    /* Obtiene todos los elementos del DOM con la clase "values-dropdown" 
    y los almacena como array con el 'spread operator' '...'
    
    el método .map recorre cada elemento del array y transforma su valor de cadena
    a número */
    const inputValues = [
        ...document.getElementsByClassName("values-dropdown")
    ].map((dropdown) => Number(dropdown.value));

    /* (a, b) => { return a - b }: Esta es la función de comparación que 
    se pasa como argumento al método sort(). Esta función toma dos parámetros 
    a y b, que representan dos elementos del array que se están comparando. 
    La función devuelve un valor numérico que determina el orden relativo 
    de a y b. 
    Si el valor devuelto es negativo, a se ordena antes que b; 
    si es positivo, b se ordena antes que a; 
    y si es cero, no hay cambio en el orden relativo de a y b. 
    En este caso, la resta a - b proporciona este valor. 
    Esta función de comparación clasifica los elementos en orden ascendente. */
    const sortedValues = inputValues.sort((a, b) => { return a - b });

    updateUI(sortedValues);
}

/* Con esta función se actualiza el UI del tirón recorriendo todos los elementos
con la clase especificada y asignándoles un 'id': índice {i} */
const updateUI = (array = []) => {
    array.forEach((num, i) => {
        const outputValueNode = document.getElementById(`output-value-${i}`);
        outputValueNode.innerText = num;
    })
}

/* Algoritmo de ordenación burbuja: Dentro del bucle interno, 
hay una condición que compara el elemento actual con su siguiente elemento. 
Si el elemento actual es mayor que el siguiente elemento, significa que están
en el orden incorrecto y necesitan ser intercambiados.

En resumen, esta función de ordenación burbuja compara elementos adyacentes 
y los intercambia si están en el orden incorrecto, repitiendo este proceso 
hasta que el array esté completamente ordenado.*/
const bubbleSort = (array) => {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - 1; j++) {
            if (array[j] > array[j + 1]) {
                const temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
    return array;
}

/* esta función implementa el algoritmo de ordenación por selección 
(selection sort)
Dentro del bucle interno, hay una condición que compara el elemento actual con
el elemento mínimo. Si el elemento actual es menor que el elemento mínimo 
encontrado hasta ahora, se actualiza minIndex para que apunte al índice del 
elemento actual. 
Después de que el bucle interno haya terminado de iterar sobre los elementos
restantes del array, se realiza un intercambio entre el elemento actual 
(array[i]) y el elemento mínimo encontrado (array[minIndex]). 
Esto coloca el elemento mínimo en la posición correcta dentro del array 
ordenado.

En resumen, el algoritmo de ordenación por selección busca iterativamente 
el elemento mínimo en la porción no ordenada del array y lo coloca en la 
posición correcta en cada iteración del bucle externo, hasta que todos los 
elementos estén en el orden correcto.*/
const selectionSort = (array) => {
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;

        for (let j = i + 1; j < array.length; j++){
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        const temp = array[i];
        array[i] = array[minIndex];
        array[minIndex] = temp;
    }

    return array;
}

/* esta función implementa el algoritmo de ordenación por inserción (insertion sort) 
Dentro del bucle while, si se encuentra un elemento mayor que currValue, 
se mueve este elemento a la derecha en el array para hacer espacio para 
currValue.
Luego, el índice j se decrementa para continuar comparando con elementos
anteriores en el array.

En resumen, el algoritmo de ordenación por inserción recorre el array y en 
cada paso, inserta el elemento actual en la posición correcta en la parte ya 
ordenada del array. Esto se logra al comparar el elemento actual con los 
elementos anteriores y moviendo los elementos mayores hacia la derecha para 
hacer espacio para el elemento actual.*/
const insertionSort = (array) => {
    for (let i = 1; i < array.length; i++) {
        const currValue = array[i];
        let j = i - 1;

        while (j >= 0 && array[j] > currValue) {
            array[j + 1] = array[j];
            j--
        }
        array[j + 1] = currValue;
    }
    return array;
}

sortButton.addEvenetListener("click", sortInputArray);