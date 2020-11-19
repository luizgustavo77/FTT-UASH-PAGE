var lista = [];
var editar = false;

$(document).ready(function () {
    equipamentos().pesquisar();

    $("#ModalCenter").on("hidden.bs.modal", function (e) {
        $(equipamentos().controles().Id).val("");
        $(equipamentos().controles().Modelo).val("");
        $(equipamentos().controles().Marca).val("");
        $(equipamentos().controles().Comentario).val("");
        $(equipamentos().controles().Colaborador).val("");
        $(equipamentos().controles().Situacao).val("");
        $(equipamentos().controles().Funcoes).val("");
        editar = false;
    });
});

var equipamentos = function () {

    var controles = function () {
        return {
            Tabela: "#tabela",
            Id: "#inputId",
            Modelo: "#inputModelo",
            Marca: "#inputMarca",
            Comentario: "#inputComentario",
            Colaborador: "#inputColaborador",
            Situacao: "#inputSituacao",
            Funcoes: "#inputFuncoes",
            openModal: "#openModal",
            closeModal: "#closeModal"
        };
    }

    var getFiltros = function () {
        var dto = {
            id: $(controles().Id).val(),
            modelo: $(controles().Modelo).val(),
            marca: $(controles().Marca).val(),
            comentario: $(controles().Comentario).val(),
            colaborador: $(controles().Colaborador).val(),
            situacao: $(controles().Situacao).val(),
            funcoes: $(controles().Funcoes).val(),
        };

        return dto;
    }

    var salvar = function () {
        mostrarLoading();

        if (!equipamentoTeste) {
            $.ajax({
                type: "POST",
                url: base_path + "Equipamentos/Salvar",
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
                modelo: $(controles().Modelo).val(),
                marca: $(controles().Marca).val(),
                comentario: $(controles().Comentario).val(),
                colaborador: $(controles().Colaborador).val(),
                situacao: $(controles().Situacao).val(),
                funcoes: $(controles().Funcoes).val(),
            })
        }
        else {
            for (var i in lista) {
                if (lista[i].Modelo == $(controles().Modelo).val()) {
                    lista[i] = {
                        id: $(controles().Id).val(),
                        modelo: $(controles().Modelo).val(),
                        marca: $(controles().Marca).val(),
                        comentario: $(controles().Comentario).val(),
                        colaborador: $(controles().Colaborador).val(),
                        situacao: $(controles().Situacao).val(),
                        funcoes: $(controles().Funcoes).val(),
                    }
                }
            }
        }

        $(controles().closeModal).click();
        montarTabela();
    }

    var pesquisar = function () {
        mostrarLoading();

        if (!equipamentoTeste) {
            $.ajax({
                type: "POST",
                url: base_path + "Equipamentos/ListaTabela",
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
            lista = equipamentoTeste;
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
            $(controles().Modelo).val(dto.modelo);
            $(controles().Marca).val(dto.marca);
            $(controles().Comentario).val(dto.comentario);
            $(controles().Colaborador).val(dto.colaborador);
            $(controles().Situacao).val(dto.situacao);
            $(controles().Funcoes).val(dto.funcoes);
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
                    data: "modelo",
                    title: 'Modelo',
                    sortable: true,
                    render: function (data) {
                        if (data)
                            return data;
                        else
                            return "Sem modelo";
                    }
                },
                {
                    data: "marca",
                    title: 'Marca',
                    sortable: true,
                    render: function (data) {
                        if (data)
                            return data;
                        else
                            return "Sem marca";
                    }
                },
                {
                    data: 'comentario',
                    title: 'Comentario',
                    sortable: true,
                    render: function (data) {
                        if (data)
                            return data;
                        else
                            return "Sem comentario";
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
                    data: 'funcoes',
                    title: 'Funções',
                    sortable: true,
                    render: function (data) {
                        if (data)
                            return data;
                        else
                            return "Sem funções";
                    }
                },
                {
                    data: null,
                    title: 'A&ccedil;&otilde;es',
                    'class': 'centro',
                    sortable: false,
                    render: function (data) {
                        var html = "";
                        html = "<a title='Alterar' role='button' onclick='equipamentos().editar(this);' style='padding:3px; cursor: pointer;'>✏️</a>";
                        html += "<a title='Excluir' data-toggle='tooltip' onclick='equipamentos().deletar(this);' data-original-title='Excluir' style='padding:3px; cursor: pointer;'>🗑</a>";

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