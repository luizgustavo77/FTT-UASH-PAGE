// Ajustar o home com informações dos desenvolvedores
// Ajustar o home para ficar mais q nem o da uber
// Ajustar a tela de login para fazer redirect para o home
// Criar tela de meu perfil falsa
// Criar tela de sobre com as tecnologias utilizadas
// Colocar link para aplicação no footer

var base_path = "";

$(document).ready(function () {
    $('.date').mask('00/00/0000');
    $('.time').mask('00:00:00');
    $('.date_time').mask('00/00/0000 00:00:00');
    $('.cep').mask('00000-000');
    $('.phone').mask('0000-0000');
    $('.phone_with_ddd').mask('(00) 0000-0000');
    $('.phone_us').mask('(000) 000-0000');
    $('.mixed').mask('AAA 000-S0S');
    $('.cpf').mask('000.000.000-00', { reverse: true });
    $('.cnpj').mask('00.000.000/0000-00', { reverse: true });
    $('.money').mask('000.000.000.000.000,00', { reverse: true });
    $('.money2').mask("#.##0,00", { reverse: true });
    $('.ip_address').mask('0ZZ.0ZZ.0ZZ.0ZZ', {
        translation: {
            'Z': {
                pattern: /[0-9]/, optional: true
            }
        }
    });
    $('.ip_address').mask('099.099.099.099');
    $('.percent').mask('##0,00%', { reverse: true });
    $('.clear-if-not-match').mask("00/00/0000", { clearIfNotMatch: true });
    $('.placeholder').mask("00/00/0000", { placeholder: "__/__/____" });
    $('.fallback').mask("00r00r0000", {
        translation: {
            'r': {
                pattern: /[\/]/,
                fallback: '/'
            },
            placeholder: "__/__/____"
        }
    });
    $('.selectonfocus').mask("00/00/0000", { selectOnFocus: true });
});

var mostrarLoading = function () {
    $("#modal").css('display', 'block');
}

var removerLoading = function () {
    $("#modal").css('display', 'none');
}

var ExtrairObjeto = function (linhaDatatable, idDatatable) {
    if (linhaDatatable != null) {
        return JSON.parse(JSON.stringify($(idDatatable).DataTable().row($(linhaDatatable).parents('tr')).data()));
    }
}

var usuariosTeste = [
    {
        "email": "teste@hotmail.com",
        "cpf": "303.165.222-23",
        "cep": "09070-070",
        "senha": "senha",
        "perfil": "Usuario"
    },
    {
        "email": "teste@hotmail.com1",
        "cpf": "303.165.222-24",
        "cep": "09070-080",
        "senha": "senha1",
        "perfil": "Prestador"
    },
    {
        "email": "teste@hotmail.com2",
        "cpf": "303.165.222-25",
        "cep": "09070-090",
        "senha": "senha2",
        "perfil": "Prestador"
    },
    {
        "email": "teste@hotmail.com",
        "cpf": "303.165.222-26",
        "cep": "09070-070",
        "senha": "senha",
        "perfil": "Usuario"
    },
    {
        "email": "teste@hotmail.com1",
        "cpf": "303.165.222-27",
        "cep": "09070-080",
        "senha": "senha1",
        "perfil": "Usuario"
    },
    {
        "email": "teste@hotmail.com2",
        "cpf": "303.165.222-28",
        "cep": "09070-090",
        "senha": "senha2",
        "perfil": "Prestador"
    },
    {
        "email": "teste@hotmail.com",
        "cpf": "303.165.222-29",
        "cep": "09070-070",
        "senha": "senha",
        "perfil": "Usuario"
    },
    {
        "email": "teste@hotmail.com1",
        "cpf": "303.165.222-30",
        "cep": "09070-080",
        "senha": "senha1",
        "perfil": "Usuario"
    },
    {
        "email": "teste@hotmail.com2",
        "cpf": "303.165.222-31",
        "cep": "09070-090",
        "senha": "senha2",
        "perfil": "Prestador"
    }
]

var equipamentoTeste = [
    {
        "id": "0",
        "modelo": "Lava e seca",
        "marca": "LG",
        "comentario": "Otima",
        "colaborador": "Luiz",
        "situacao": "Funcionando",
        "funcoes": "lava,seca"
    },
    {
        "id": "01",
        "modelo": "Lava e seca",
        "marca": "SAMSUNG",
        "comentario": "Pode usar o secar",
        "colaborador": "Marcelo",
        "situacao": "Funcionando",
        "funcoes": "lava,seca"
    },
    {
        "id": "02",
        "modelo": "Lava e seca",
        "marca": "AOC",
        "comentario": "Tenho produtos",
        "colaborador": "Thiago",
        "situacao": "Funcionando",
        "funcoes": "lava,seca"
    },
    {
        "id": "03",
        "modelo": "Lava e seca",
        "marca": "AOC",
        "comentario": "Tenho produtos",
        "colaborador": "Thiago",
        "situacao": "Funcionando",
        "funcoes": "lava,seca"
    },
    {
        "id": "04",
        "modelo": "Lava e seca",
        "marca": "AOC",
        "comentario": "Tenho produtos",
        "colaborador": "Thiago",
        "situacao": "Funcionando",
        "funcoes": "lava,seca"
    },
    {
        "id": "05",
        "modelo": "Lava e seca",
        "marca": "AOC",
        "comentario": "Tenho produtos",
        "colaborador": "Thiago",
        "situacao": "Funcionando",
        "funcoes": "lava,seca"
    }
]


var trabalhoTeste = [
    {
        "id": "0",
        "solicitante": "Luiz",
        "colaborador": "Marcelo",
        "avaliacao": "Trabalho bem feito",
        "situacao": "Feito",
        "kg": "10Kg"
    },
    {
        "id": "01",
        "solicitante": "Jho",
        "colaborador": "Marcelo",
        "avaliacao": "Trabalho bem feito",
        "situacao": "Em andamento",
        "kg": "5Kg"
    },
    {
        "id": "02",
        "solicitante": "Luiz",
        "colaborador": "Marcelo",
        "avaliacao": "OK",
        "situacao": "Feito",
        "kg": "5Kg"
    },
    {
        "id": "03",
        "solicitante": "Luiz",
        "colaborador": "Jho",
        "avaliacao": "Trabalho bem feito",
        "situacao": "Em andamento",
        "kg": "10Kg"
    },
    {
        "id": "04",
        "solicitante": "Luiz",
        "colaborador": "Marcelo",
        "avaliacao": "Trabalho bem feito",
        "situacao": "Cancelado",
        "kg": "10Kg"
    },
    {
        "id": "05",
        "solicitante": "Jho",
        "colaborador": "Thiago",
        "avaliacao": "Trabalho bem feito",
        "situacao": "Feito",
        "kg": "5Kg"
    },
    {
        "id": "06",
        "solicitante": "Luiz",
        "colaborador": "Thiago",
        "avaliacao": "Trabalho bem feito",
        "situacao": "Cancelado",
        "kg": "10Kg"
    },
    {
        "id": "07",
        "solicitante": "Luiz",
        "colaborador": "Jho",
        "avaliacao": "Trabalho bem feito",
        "situacao": "Feito",
        "kg": "5Kg"
    },
    {
        "id": "08",
        "solicitante": "Luiz",
        "colaborador": "Marcelo",
        "avaliacao": "Trabalho bem feito",
        "situacao": "Feito",
        "kg": "10Kg"
    },
    {
        "id": "09",
        "solicitante": "Luiz",
        "colaborador": "Thiago",
        "avaliacao": "Trabalho bem feito",
        "situacao": "Cancelado",
        "kg": "10Kg"
    },
    {
        "id": "10",
        "solicitante": "Luiz",
        "colaborador": "Marcelo",
        "avaliacao": "Trabalho bem feito",
        "situacao": "Feito",
        "kg": "5Kg"
    },
    {
        "id": "11",
        "solicitante": "Luiz",
        "colaborador": "Thiago",
        "avaliacao": "Trabalho bem feito",
        "situacao": "Feito",
        "kg": "5Kg"
    },
]