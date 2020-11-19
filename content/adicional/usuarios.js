var lista = [];
var editar = false;

$(document).ready(function () {
    usuarios().pesquisar();

    $("#ModalCenter").on("hidden.bs.modal", function (e) {
        $(usuarios().controles().Email).val("");
        $(usuarios().controles().CPF).val("");
        $(usuarios().controles().CPF).prop('disabled', false);
        $(usuarios().controles().CEP).val("");
        $(usuarios().controles().Senha).val("");
        editar = false;
    });
});

var usuarios = function () {

    var controles = function () {
        return {
            Tabela: "#tabela",
            Email: "#inputEmail",
            CPF: "#inputCPF",
            CEP: "#inputCEP",
            Senha: "#inputPassword",
            ConfirmarSenha: "#inputPasswordValid",
            openModal: "#openModal",
            rbusuario: "#usuario",
            rbpestador: "#pestador",
            closeModal: "#closeModal"
        };
    }

    var getFiltros = function () {
        var dto = {
            email: $(controles().Email).val(),
            cpf: $(controles().CPF).val(),
            cep: $(controles().CEP).val(),
            senha: $(controles().Senha).val(),
            perfil: $(controles().rbpestador).prop('checked')? "pestador" : "usuario"
        };

        return dto;
    }

    var salvar = function () {
        mostrarLoading();

        if (!usuariosTeste) {
            $.ajax({
                type: "POST",
                url: base_path + "Usuarios/Salvar",
                data: {
                    'dto': getFiltros()
                },
                cache: false,
            }).done(function (data) {
                adicionar();
            }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
                alert('Problemas ao carregar ao salvar. ' + errorThrown);
            });
        }
        else {
            adicionar();
        }
    }

    var adicionar = function () {
        if (!editar) {
            lista.push({
                email: $(controles().Email).val(),
                cpf: $(controles().CPF).val(),
                cep: $(controles().CEP).val(),
                senha: $(controles().Senha).val(),
                perfil: $(controles().rbpestador).prop('checked')? "pestador" : "usuario"
            })
        }
        else {
            for (var i in lista) {
                if (lista[i].cpf == $(controles().CPF).val()) {
                    lista[i] = {
                        email: $(controles().Email).val(),
                        cpf: $(controles().CPF).val(),
                        cep: $(controles().CEP).val(),
                        senha: $(controles().Senha).val(),
                        perfil: $(controles().rbpestador).prop('checked')? "pestador" : "usuario"
                    }
                }
            }
        }

        $(controles().closeModal).click();
        montarTabela();
    }

    var pesquisar = function () {
        mostrarLoading();

        if (!usuariosTeste) {
            $.ajax({
                type: "POST",
                url: base_path + "Usuarios/ListaTabela",
                data: {
                    'dto': getFiltros()
                },
                cache: false,
            }).done(function (data) {
                if (data) {
                    montarTabela(data);
                }
                else {
                    removerLoading();
                }
            }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
                alert('Problemas ao carregar a pesquisa. ' + errorThrown);
            });
        }
        else {
            lista = usuariosTeste;
        }

        montarTabela();
    }

    var editar = function (linhaDataTable) {
        mostrarLoading();
        var dto = ExtrairObjeto(linhaDataTable, controles().Tabela);

        $(controles().openModal).click();

        if (dto) {
            editar = true;
            $(controles().Email).val(dto.email);
            $(controles().CPF).val(dto.cpf);
            $(controles().CPF).prop('disabled', true);
            $(controles().CEP).val(dto.cep);
            $(controles().Senha).val(dto.senha);
            if (dto.perfil.indexOf("pestador") >= 0) {
                $(controles().rbpestador).prop('checked',true)
            }
            else {
                $(controles().rbusuario).prop('checked',true)
            }
            removerLoading();
        }
        else {
            alert("Problema ao carregar");
            removerLoading();
        }
    }

    var deletar = function (linhaDataTable) {
        mostrarLoading();
        var dto = ExtrairObjeto(linhaDataTable, controles().Tabela);

        for (var i in lista) {
            if (lista[i].cpf == dto.cpf) {
                lista.splice(i, 1);
                montarTabela();
                break;
            }
        }

        removerLoading();
    }

    var montarTabela = function () {
        $(controles().Tabela).DataTable({
            dom: 'Bfrtip', buttons: ['excelHtml5'],
            data: lista,
            destroy: true,
            filter: false,
            info: false,
            paginate: true,
            paginationType: 'full_numbers',
            lengthChange: false,
            iDisplayLength: 10,
            language: {
                processing: 'Processando...',
                zeroRecords: 'Nenhum registro encontrado.',
                paginate: {
                    first: '&laquo;',
                    previous: '<',
                    next: '>',
                    last: '&raquo;'
                }
            },
            order: [[0, 'asc']],
            columns: [
                {
                    data: "cpf",
                    title: 'Usuario CPF',
                    sortable: true,
                    render: function (data) {
                        if (data)
                            return data;
                        else
                            return "Sem CPF";
                    }
                },
                {
                    data: 'perfil',
                    title: 'Perfil',
                    sortable: true,
                    render: function (data) {
                        if (data) {
                            return data;
                        }
                        else
                            return "Sem perfil";
                    }
                },
                {
                    data: 'cep',
                    title: 'CEP',
                    sortable: true,
                    render: function (data) {
                        if (data)
                            return data;
                        else
                            return "Sem CEP";
                    }
                },
                {
                    data: null,
                    title: 'A&ccedil;&otilde;es',
                    'class': 'centro',
                    sortable: false,
                    render: function (data) {
                        var html = "";
                        html = "<a title='Alterar' role='button' onclick='usuarios().editar(this);' style='padding:3px; cursor: pointer;'>✏️</a>";
                        html += "<a title='Excluir' data-toggle='tooltip' onclick='usuarios().deletar(this);' data-original-title='Excluir' style='padding:3px; cursor: pointer;'>🗑</a>";

                        return html;
                    }
                }
            ]
        })

        removerLoading();
    }

    return {
        pesquisar: pesquisar,
        editar: editar,
        deletar: deletar,
        controles: controles,
        salvar: salvar
    }
}