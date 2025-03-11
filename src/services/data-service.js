class DataService {
  
    constructor() {

    }

    getStudentsData() {
        const data = [
            {
                "name": "Lorenzo",
                "surname": "Puppo",
                "yob": 1995,
                "nationality": "italiana",
                "gender": "m",
                "marks": [
                    8,
                    9,
                    10
                ]
            },
            {
                "name": "Jan",
                "surname": "Stigliani",
                "yob": 2000,
                "nationality": "italiana",
                "gender": "m",
                "marks": [
                    7,
                    7,
                    8
                ]
            },
            {
                "name": "Giovanni",
                "surname": "Sussarellu",
                "yob": 1981,
                "nationality": "italiana",
                "gender": "m",
                "marks": [
                    7,
                    6,
                    8
                ]
            },
            {
                "name": "Sara",
                "surname": "De Prà",
                "yob": 1989,
                "nationality": "italiana",
                "gender": "fluid",
                "marks": [
                    9,
                    6,
                    8
                ]
            },
            {
                "name": "Jeremias",
                "surname": "Cedeno",
                "yob": 2003,
                "nationality": "ecuadoriano",
                "gender": "m",
                "marks": [
                    6,
                    10,
                    7
                ]
            },
            {
                "name": "Laura",
                "surname": "Mazza",
                "yob": 1984,
                "nationality": "italiana",
                "gender": "f",
                "marks": [
                    4,
                    2,
                    6
                ]
            },
            {
                "name": "Eusebio",
                "surname": "Veizi",
                "yob": 1993,
                "nationality": "albanese",
                "gender": "peanut",
                "marks": [
                    5,
                    7,
                    6
                ]
            },
            {
                "name": "Hugo",
                "surname": "Martinez",
                "yob": 1994,
                "nationality": "elSalvador",
                "gender": "f",
                "marks": [
                    10,
                    10,
                    8
                ]
            }
        ]
        return data;
    }
  
}

export default DataService;