function cfl(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const pokebtn = '#pokedex-buttons';
const pokedata = '#pokedex-image';
var link;

$('document').ready(function() {
  const limit = prompt('Hvor mange pokémoner')
  $.ajax({
    url: 'https://pokeapi.co/api/v2/pokemon?limit=' + limit,
    type: 'get',
    dataType: 'json',
    success: function(data) {
      $(pokebtn).text('');
      for (const v of data.results) {
        $(pokebtn).append('<li><span onclick="getPokemonData(' + "'" +  v.name + "'" + ')">' + cfl(v.name) + '</span></li>');
      }
    },
    error: function() {
      $(pokebtn).text(':(');
			location.reload();
    }
  })
})

function getPokemonData(name) {
	//console.log(name);
	$.ajax({
		url: 'https://pokeapi.co/api/v2/pokemon/' + name,
		type: 'get',
		dataType: 'json',
		success: function(data) {
			console.log(data.id);
      //$(pokebtn).text(data.id);
			$(pokebtn).css('display', 'none');
			$(pokedata).css('display', 'flex');
			$(pokedata).html('<button class="back" onclick="back()">&#8592;</button>')
			$(pokedata).append('<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/' + data.id + '.svg">');
			for (const c of data.types) {
				$(pokedata).append('<h1>' + c.type.name + '</h1>')
			}
		},
		error: function() {
			$(pokebtn).text(':(');
			location.reload();
		}
	})
}

function back() {
	$(pokedata).css('display', 'none');
	$(pokebtn).css('display', 'flex')
}
