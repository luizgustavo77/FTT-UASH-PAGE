var lista = [];
var editar = false;

$(document).ready(function () {
    trabalhos().pesquisar();

    $("#ModalCenter").on("hidden.bs.modal", function (e) {
        $(trabalhos().controles().Id).val("");
        $(trabalhos().controles().Solicitante).val("");
        $(trabalhos().controles().Avaliacao).val("");
        $(trabalhos().controles().Colaborador).val("");
        $(trabalhos().controles().Situacao).val("");
        $(trabalhos().controles().KG).val("");
        editar = false;
    });
});

var trabalhos = function () {

    var controles = function () {
        return {
            Tabela: "#tabela",
            Id: "#inputId",
            Solicitante: "#inputSolicitante",
            Avaliacao: "#inputAvaliacao",
            Colaborador: "#inputColaborador",
            Situacao: "#inputSituacao",
            KG: "#inputKG",
            openModal: "#openModal",
            closeModal: "#closeModal"
        };
    }

    var getFiltros = function () {
        var dto = {
            id: $(controles().Id).val(),
            solicitante: $(controles().Solicitante).val(),
            avaliacao: $(controles().Avaliacao).val(),
            colaborador: $(controles().Colaborador).val(),
            situacao: $(controles().Situacao).val(),
            kg: $(controles().KG).val(),
        };

        return dto;
    }

    var salvar = function () {
        mostrarLoading();

        if (!trabalhoTeste) {
            $.ajax({
                type: "POST",
                url: base_path + "Trabalhos/Salvar",
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
                id: $(controles().Id).val(),
                solicitante: $(controles().Solicitante).val(),
                avaliacao: $(controles().Avaliacao).val(),
                colaborador: $(controles().Colaborador).val(),
                situacao: $(controles().Situacao).val(),
                kg: $(controles().KG).val(),
            })
        }
        else {
            for (var i in lista) {
                if (lista[i].Solicitante == $(controles().Solicitante).val()) {
                    lista[i] = {
                        id: $(controles().Id).val(),
                        solicitante: $(controles().Solicitante).val(),
                        avaliacao: $(controles().Avaliacao).val(),
                        colaborador: $(controles().Colaborador).val(),
                        situacao: $(controles().Situacao).val(),
                        kg: $(controles().KG).val(),
                    }
                }
            }
        }

        $(controles().closeModal).click();
        montarTabela();
    }

    var pesquisar = function () {
        mostrarLoading();

        if (!trabalhoTeste) {
            $.ajax({
                type: "POST",
                url: base_path + "Trabalhos/ListaTabela",
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
            lista = trabalhoTeste;
        }

        montarTabela();
    }

    var editar = function (linhaDataTable) {
        mostrarLoading();
        var dto = ExtrairObjeto(linhaDataTable, controles().Tabela);

        $(controles().openModal).click();

        if (dto) {
            editar = true;
            $(controles().Id).val(dto.id);
            $(controles().Solicitante).val(dto.solicitante);
            $(controles().Avaliacao).val(dto.avaliacao);
            $(controles().Colaborador).val(dto.colaborador);
            $(controles().Situacao).val(dto.situacao);
            $(controles().KG).val(dto.kg);
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
            if (lista[i].id == dto.id) {
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
                    data: "solicitante",
                    title: 'Solicitante',
                    sortable: true,
                    render: function (data) {
                        if (data)
                            return data;
                        else
                            return "Sem solicitante";
                    }
                },
                {
                    data: "avaliacao",
                    title: 'Avaliacao',
                    sortable: true,
                    render: function (data) {
                        if (data)
                            return data;
                        else
                            return "Sem avaliacao";
                    }
                },                
                {
                    data: 'colaborador',
                    title: 'Colaborador',
                    sortable: true,
                    render: function (data) {
                        if (data)
                            return data;
                        else
                            return "Sem colaborador";
                    }
                },
                {
                    data: 'situacao',
                    title: 'Situação',
                    sortable: true,
                    render: function (data) {
                        if (data)
                            return data;
                        else
                            return "Sem situação";
                    }
                },
                {
                    data: 'kg',
                    title: 'Peso',
                    sortable: true,
                    render: function (data) {
                        if (data)
                            return data;
                        else
                            return "Sem Peso";
                    }
                },
                {
                    data: null,
                    title: 'A&ccedil;&otilde;es',
                    'class': 'centro',
                    sortable: false,
                    render: function (data) {
                        var html = "";
                        html = "<a title='Alterar' role='button' onclick='trabalhos().editar(this);' style='padding:3px; cursor: pointer;'>✏️</a>";
                        html += "<a title='Excluir' data-toggle='tooltip' onclick='trabalhos().deletar(this);' data-original-title='Excluir' style='padding:3px; cursor: pointer;'>🗑</a>";

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