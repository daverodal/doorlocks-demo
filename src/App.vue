<template>
  <div id="app" class="container">
    <h1 class="">Access Levels</h1>
    <div class="row">
      <div class="col-6 red">
        <input v-model="search" class="search" placeholder="search">
        <table class="table">
          <tr>
            <th>Name</th>
            <th>Reader Type</th>
            <th>Reader(s)</th>
          </tr>
          <tr @click="setSelected(level.id)" v-for="level in visibleLevels" :key="level.id" :class="{selected: level.id === $store.state.selectedId}">
            <td>{{ level.name }}</td>
            <td> {{ getReaderType(level.readerId)}}</td>
            <td> {{ getReaderName(level.readerId)}}</td>
          </tr>
        </table>

      </div>
      <div class="col-6">
        <h2>Access Name</h2>
        <div v-if="selected === null">None selected</div>
          <div v-if="selected">
            <form >
              <div class="form-group">
                <label for="name">Name</label>
                <input class="form-control" type="text" id="name" v-model="name">
              </div>
              <div class="form-group">
                <label for="desc">Name</label>
                <textarea class="form-control" id="desc" v-model="Description"></textarea>
              </div>
              <div class="form-group">
                <label for="readers">Readers</label>
             <select id="readers" class="form-control" v-model="readerId">
                <option disabled value="readerId  ">Please select one</option>
                <option v-for="option in $store.state.readers" v-bind:value="option.id">
                  {{ option.name }}
                </option>
              </select>
              </div>
            </form>
             <button class="btn btn-primary" :disabled="!isDirty" @click="save">Save</button>
             <button class="btn btn-secondary" @click="cancel">Cancel</button>
          </div>
      </div>
    </div>


  </div>
</template>

<script>
    import { mapGetters } from 'vuex'

  export default {
    name: 'App',
      data: () => {
        return {
            name: '',
            Description: '',
            readerId: null,
          search: ''
        }
      },
    watch: {
      search(){
        this.$store.commit('setFilter', this.search);
      }
    },
    computed:{
        ...mapGetters(['selected', 'getReader', 'visibleLevels', 'readerTypes']),
        isDirty(){
          if(!this.selected){
            return false;
          }
          if(this.selected.name === this.name &&
            this.selected.Description === this.Description &&
            this.selected.readerId === this.readerId){
            return false
          }
          return true;
        }
    },

    methods:{
      setSelected(id){
        this.$store.commit('selSelected', id);
        this.name = this.selected.name;
        this.Description = this.selected.Description;
        this.readerId = this.selected.readerId;
      },
      getReaderName(readerId){
        return this.getReader(readerId).name;
      },
      getReaderType(readerId){
        const found = this.getReader(readerId);
        const readerType = this.readerTypes.find( item => item.id === found.typeId);
        return readerType.name;
      },
      save(){
          this.$store.commit('save', {name: this.name, Description: this.Description, readerId: this.readerId})
      },
      cancel(){
        this.name = this.selected.name;
        this.Description = this.selected.Description;
        this.readerId = this.selected.readerId;      }
    },
      mounted(){
        if(this.selected){
            this.name = this.selected.name;
            this.Description = this.selected.Description;
            this.readerId = this.selected.readerId;
        }
      },
    components: {
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }
  .red{
  }
  .selected{
    background: powderblue;
  }
  .btn{
    margin: 0 5px;
  }
  .btn-primary:disabled, .btn-primary.disabled{
    background: lightgrey !important;
    border-color: lightgrey !important;
  }

  .search{
    margin: 0px 0px 10px 0;
  }
  // custom.scss
  @import '~bootstrap/scss/bootstrap';
  @import '~bootstrap-vue/src/index.scss';
</style>
