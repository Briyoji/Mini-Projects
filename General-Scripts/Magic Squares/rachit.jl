function parse_string_type(expr)
    parsed_terms = Dict{String, Integer}()
    terms = SubString.(expr, findall(r"[\+\-]?\d?\*?[a-z]{0,}\^?\d?",expr))
    for idx in eachindex(terms)
        
        term = terms[idx]
        
        if term == ""
            continue
        end

        if match(r"^[\-|\+]", term) == nothing 
            term = string("+",term)
        end

        if match(r"^[\-|\+][a-z]", term) != nothing
            term = string(term[1],"1*",term[2:end])
        end

        if match(r"^[\-|\+]\d+[a-z]", term) != nothing
            indices = findall(r"^[\-|\+]\d+", term)
            term = string(term[indices[1][1]:indices[1][2]],"*",term[indices[1][2]+1:end])
        end

        term_data = split(term,"*")
        
        if length(term_data) == 1
            push!(term_data,"constant")            
        end

        parsed_terms[term_data[2]] = parse(Int64,term_data[1])
    end

    return parsed_terms
end

function parse_bracket_type(expr)
    parsed_terms = Dict{String, Integer}()
    terms = SubString.(expr, findall(r"((?<=\()[\+|\-]?\d+\,?[a-z]?\d?)",expr))
    for idx in eachindex(terms)
        
        term = terms[idx]
        
        if term == ""
            continue
        end

        term_data = split(term,",")

        if length(term_data) == 1
            push!(term_data,"constant")            
        end

        parsed_terms[term_data[2]] = parse(Int64,term_data[1])
    end

    return parsed_terms
end

function add_equation(eqn_1, eqn_2)
    return merge(+,eqn_1,eqn_2)
end

function get_row_sum(row_number, matrice)
    row_sum = Dict{String, Integer}()
    for equation in matrice[row_number]
        row_sum = add_equation(row_sum, equation)
    end
    return row_sum
end

function get_col_sum(col_number, matrice)
    col_sum = Dict{String, Integer}()
    for row in matrice
        col_sum = add_equation(col_sum, row[col_number])
    end
    return col_sum
end

function check_magic_square(matrice)
    println("--------------")
    sum = get_row_sum(1, matrice)
    
    for idx in eachindex(matrice)
        if sum != get_row_sum(idx, matrice)
            return "Not a Magic Square! Error at ROW-$idx"
        end
            
        if sum != get_col_sum(idx, matrice)
            return "Not a Magic Square! Error at COL-$idx"
        end    
    end

    diagonal1 = Dict{String, Integer}()
    diagonal2 = Dict{String, Integer}()
    
    for row in eachindex(matrice[1])
        diagonal1 = add_equation(diagonal1, matrice[row][row])
        diagonal2 = add_equation(diagonal2, matrice[row][length(matrice[1])+1 - row])
    end

    if sum != diagonal1
        return "Not a Magic Square! Error at Diagonal-1"
    end

    if sum != diagonal2
        return "Not a Magic Square! Error at Diagonal-2"
    end

    return "It is a Magic Square!"
end

matrices = []

open("magic_square.txt", "r") do file
    matrice = []
    for line in eachline(file)
        if line == ""
            push!(matrices, matrice)
            println(check_magic_square(matrice))
            println("--x--x--x--x--\n")
            matrice = []
            continue
        end
        
        println(line)

        line = split(line, " ")

        row = []
        for equation in line
            if equation != ""
                if match(r"^\(",equation) != nothing
                    push!(row,parse_bracket_type(equation))
                else
                    push!(row,parse_string_type(equation))
                end
            end
        end
        push!(matrice, row)
    end
    push!(matrices, matrice)
    println(check_magic_square(matrice))
end