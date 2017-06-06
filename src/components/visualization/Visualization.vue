<template>
  <div class="visualization">
    <svg id="cnn-viz" width="100%" height="100%">
      <g></g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'visualization',
  data() {
    return {
      convnet: null
    };
  },
  methods: {
    loadJSON: function(callback) {   

        var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
        xobj.open('GET', '../../../build/data_structure.json', true); // Replace 'my_data' with the path to your file
        xobj.onreadystatechange = function () {
              if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
              }
        };
        xobj.send(null);  
    },
    getPojo: function() {
      this.convet = loadJSON();
    }
  },
  mounted: function() {
    this.getPojo()
  },
  components: {

  }

};
</script>
