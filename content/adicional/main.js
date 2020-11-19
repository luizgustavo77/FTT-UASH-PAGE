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
        "email": "luiz_gustavo_77@hotmail.com",
        "cpf": "409.165.428-23",
        "cep": "09070-060",
        "senha": "senha",
        "perfil": "pestador"
    },
    {
        "email": "luiz_gustavo_77@hotmail.com1",
        "cpf": "409.165.428-231",
        "cep": "09070-0601",
        "senha": "senha1",
        "perfil": "pestador1"
    },
    {
        "email": "luiz_gustavo_77@hotmail.com2",
        "cpf": "409.165.428-232",
        "cep": "09070-0602",
        "senha": "senha2",
        "perfil": "pestador2"
    }
]

var equipamentoTeste = [
    {
        "id": "0",
        "modelo": "lava",
        "marca": "lg",
        "comentario": "comentario",
        "colaborador": "luiz",
        "situacao": "funcionando",
        "funcoes": "lava,seca"
    },
    {
        "id": "01",
        "modelo": "lava1",
        "marca": "lg1",
        "comentario": "comentario1",
        "colaborador": "luiz1",
        "situacao": "funcionando1",
        "funcoes": "lava,seca1"
    },
    {
        "id": "02",
        "modelo": "lava2",
        "marca": "lg2",
        "comentario": "comentario2",
        "colaborador": "luiz2",
        "situacao": "funcionando2",
        "funcoes": "lava,seca2"
    }
]